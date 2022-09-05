import { createFragmentFromPreview, createTemplateFragmentFromDataBase } from "./utils/template.js";
import { GetMessage, GetMeta, GetUserName, IsConnected, connectWhenReceivedData } from "./meta.js";
import { SetMedia, CreateDataBase } from "../../components/database.js";
import { createMessageTemplate } from "../../components/template.js";
import { GetMediaSize, GetMultimediaPreview } from "./fs.js";
import { socket } from "./socket.js";
import * as Interface from "./interface.js";
socket.on("1" /* Events.IncomingMultimedia */, async (pack) => {
    Array.from(Interface.historyElement.children).forEach((children) => children.remove());
    connectWhenReceivedData(socket, pack.meta);
    for (const name in pack.data) {
        const file = pack.data[name];
        await SetMedia(file);
        console.log(`${name} fue guardado correctamente`);
    }
    Interface.historyElement.appendChild(await createTemplateFragmentFromDataBase());
    socket.emit("2" /* Events.MultimediaReceive */, pack.meta.from);
});
socket.on("5" /* Events.IncomingMessage */, (message) => {
    Interface.messageElement.appendChild(createMessageTemplate(message));
    connectWhenReceivedData(socket, message.meta);
    socket.emit("6" /* Events.MessageReceived */, message.meta.from);
});
socket.on("6" /* Events.MessageReceived */, () => {
    const lastMessage = Array.from(Interface.messageElement.children).at(-1);
    if (lastMessage) {
        lastMessage.innerHTML = `<strong>Recibido</strong> ${lastMessage.innerHTML}`;
    }
    console.log("Mensaje enviado");
});
socket.on("2" /* Events.MultimediaReceive */, () => {
    console.log("Multimedia enviada");
    Interface.previewElement.innerHTML = "";
});
socket.on("4" /* Events.MessageNotReceived */, () => {
    console.log("Mensaje no enviado");
});
socket.on("0" /* Events.MultimediaNotReceived */, () => {
    console.log("Multimedia no enviada");
});
socket.on("12" /* Events.NicknameUsed */, () => {
    Interface.socketIdInputElement.value = socket.id;
});
socket.on("connect", () => {
    Interface.socketIdInputElement.value = localStorage.getItem("dss:nickname") ?? socket.id;
    socket.emit("11" /* Events.UseNickname */, Interface.socketIdInputElement.value);
    setInterval(() => {
        socket.emit("10" /* Events.Match */, Interface.connectionInputElement.value);
    }, 100);
});
socket.on("9" /* Events.MatchedFailed */, () => {
    Interface.connectionStateElement.innerHTML = "Desconectado";
});
socket.on("8" /* Events.MatchedSuccessFully */, () => {
    Interface.connectionStateElement.innerHTML = "Conectado";
});
Interface.socketIdInputElement.addEventListener("change", () => {
    localStorage.setItem("dss:nickname", Interface.socketIdInputElement.value);
    socket.emit("11" /* Events.UseNickname */, Interface.socketIdInputElement.value);
});
Interface.clientNameInputElement.addEventListener("change", () => {
    localStorage.setItem("dss:username", Interface.clientNameInputElement.value);
});
Interface.sendMessageButton.addEventListener("click", () => {
    if (IsConnected()) {
        const message = {
            meta: GetMeta(socket),
            name: GetUserName(),
            body: GetMessage(),
        };
        Interface.messageElement.appendChild(createMessageTemplate(message));
        socket.emit("7" /* Events.SendMessage */, message);
    }
});
Interface.sendFilesButton.addEventListener("click", async () => {
    if (GetMediaSize() > 1048576 /* Sizes.MegaByte */ * 45) {
        return alert(`El paquete que quiere enviar pesa mas de 45MB`);
    }
    if (IsConnected()) {
        const packet = {
            data: await GetMultimediaPreview(),
            meta: GetMeta(socket),
            name: GetUserName(),
        };
        socket.emit("3" /* Events.SendMultimedia */, packet);
    }
});
Interface.fileInputElement.addEventListener("change", async () => {
    Array.from(Interface.previewElement.children).forEach((children) => children.remove());
    Interface.previewElement.appendChild(createFragmentFromPreview(Object.values(await GetMultimediaPreview())));
});
window.addEventListener("load", async () => {
    Interface.clientNameInputElement.value = localStorage.getItem("dss:username") ?? navigator.platform;
    await CreateDataBase();
    Interface.historyElement.append(await createTemplateFragmentFromDataBase());
});
window.addEventListener("beforeunload", () => {
    socket.disconnect();
});
//# sourceMappingURL=listeners.js.map