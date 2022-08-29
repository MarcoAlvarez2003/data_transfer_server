import {
    sendFilesButton,
    sendMessageButton,
    connectionInputElement,
    socketIdInputElement,
    clientNameInputElement,
    connectionStateElement,
    historyElement,
    fileInputElement,
    previewElement,
    messageElement,
} from "./interface.js";

import { createFragmentFromDataBase, createMultimediaTemplate, createMessageTemplate } from "../utils/template.js";
import { GetMessage, GetMeta, GetUserName, IsConnected, connectWhenReceivedData } from "./meta.js";
import { SetMedia, CreateDataBase } from "./database.js";
import { Message } from "../types/message.js";
import { Package } from "../types/package.js";
import { GetMediaSize } from "./fs.js";
import { socket } from "./socket.js";
import { Events } from "./events.js";
import { GetMedia } from "./fs.js";
import { Sizes } from "./sizes.js";

socket.on(Events.IncomingMultimedia, async (pack: Package) => {
    connectWhenReceivedData(socket, pack.meta);

    historyElement.innerHTML = "";

    for (const name in pack.data) {
        const file = pack.data[name];

        await SetMedia(file);

        console.log(`${name} fue guardado correctamente`);
    }

    historyElement.appendChild(await createFragmentFromDataBase());

    socket.emit(Events.MultimediaReceive, pack.meta.from);
});

socket.on(Events.IncomingMessage, (message: Message) => {
    messageElement.appendChild(createMessageTemplate(message));

    connectWhenReceivedData(socket, message.meta);

    socket.emit(Events.MessageReceived, message.meta.from);
});

socket.on(Events.MessageReceived, () => {
    const lastMessage = Array.from(messageElement.children).at(-1);

    if (lastMessage) {
        lastMessage.innerHTML = `<strong>Recibido</strong> ${lastMessage.innerHTML}`;
    }

    console.log("Mensaje enviado");
});

socket.on(Events.MultimediaReceive, () => {
    console.log("Multimedia enviada");
    previewElement.innerHTML = "";
});

socket.on(Events.MessageNotReceived, () => {
    console.log("Mensaje no enviado");
});

socket.on(Events.MultimediaNotReceived, () => {
    console.log("Multimedia no enviada");
});

socket.on(Events.NicknameUsed, () => {
    socketIdInputElement.value = socket.id;
});

socket.on("connect", () => {
    socketIdInputElement.value = localStorage.getItem("dss:nickname") ?? socket.id;
    socket.emit(Events.UseNickname, socketIdInputElement.value);

    setInterval(() => {
        socket.emit(Events.Match, connectionInputElement.value);
    }, 100);
});

socket.on(Events.MatchedFailed, () => {
    connectionStateElement.innerHTML = "Desconectado";
});

socket.on(Events.MatchedSuccessFully, () => {
    connectionStateElement.innerHTML = "Conectado";
});

socketIdInputElement.addEventListener("change", () => {
    localStorage.setItem("dss:nickname", socketIdInputElement.value);
    socket.emit(Events.UseNickname, socketIdInputElement.value);
});

clientNameInputElement.addEventListener("click", () => {
    localStorage.setItem("dss:username", clientNameInputElement.value);
});

sendMessageButton.addEventListener("click", () => {
    if (IsConnected()) {
        const message: Message = {
            meta: GetMeta(socket),
            name: GetUserName(),
            body: GetMessage(),
        };

        messageElement.appendChild(createMessageTemplate(message));

        socket.emit(Events.SendMessage, message);
    }
});

sendFilesButton.addEventListener("click", async () => {
    if (GetMediaSize() > Sizes.MegaByte * 45) {
        return alert(`El paquete que quiere enviar pesa mas de 45MB`);
    }

    if (IsConnected()) {
        const packet: Package = {
            data: await GetMedia(),
            meta: GetMeta(socket),
            name: GetUserName(),
        };

        socket.emit(Events.SendMultimedia, packet);
    }
});

fileInputElement.addEventListener("change", async () => {
    const fragment = document.createDocumentFragment();
    const media = await GetMedia();

    previewElement.innerHTML = "";

    for (const multimedia of Object.values(media)) {
        const template = createMultimediaTemplate(multimedia);

        fragment.appendChild(template);
    }

    previewElement.appendChild(fragment);
});

window.addEventListener("load", async () => {
    clientNameInputElement.value = localStorage.getItem("dss:username") ?? navigator.platform;
    await CreateDataBase();

    historyElement.append(await createFragmentFromDataBase());
});

window.addEventListener("beforeunload", () => {
    socket.disconnect();
});
