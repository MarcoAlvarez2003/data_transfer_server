import { sendFilesButton, sendMessageButton, connectionInputElement, socketIdInputElement, clientNameInputElement, connectionStateElement, historyElement, fileInputElement, previewElement, messageElement, } from "./interface.js";
import { createFragmentFromDataBase, createMultimediaTemplate, createMessageTemplate } from "../utils/template.js";
import { GetMessage, GetMeta, GetUserName, IsConnected, connectWhenReceivedData } from "./meta.js";
import { SetMedia, CreateDataBase } from "./database.js";
import { GetMediaSize } from "./fs.js";
import { socket } from "./socket.js";
import { GetMedia } from "./fs.js";
socket.on("1" /* Events.IncomingMultimedia */, async (pack) => {
    connectWhenReceivedData(socket, pack.meta);
    historyElement.innerHTML = "";
    for (const name in pack.data) {
        const file = pack.data[name];
        await SetMedia(file);
        console.log(`${name} fue guardado correctamente`);
    }
    historyElement.appendChild(await createFragmentFromDataBase());
    socket.emit("2" /* Events.MultimediaReceive */, pack.meta.from);
});
socket.on("5" /* Events.IncomingMessage */, (message) => {
    messageElement.appendChild(createMessageTemplate(message));
    connectWhenReceivedData(socket, message.meta);
    socket.emit("6" /* Events.MessageReceived */, message.meta.from);
});
socket.on("6" /* Events.MessageReceived */, () => {
    const lastMessage = Array.from(messageElement.children).at(-1);
    if (lastMessage) {
        lastMessage.innerHTML = `<strong>Recibido</strong> ${lastMessage.innerHTML}`;
    }
    console.log("Mensaje enviado");
});
socket.on("2" /* Events.MultimediaReceive */, () => {
    console.log("Multimedia enviada");
    previewElement.innerHTML = "";
});
socket.on("4" /* Events.MessageNotReceived */, () => {
    console.log("Mensaje no enviado");
});
socket.on("0" /* Events.MultimediaNotReceived */, () => {
    console.log("Multimedia no enviada");
});
socket.on("12" /* Events.NicknameUsed */, () => {
    socketIdInputElement.value = socket.id;
});
socket.on("connect", () => {
    socketIdInputElement.value = localStorage.getItem("dss:nickname") ?? socket.id;
    socket.emit("11" /* Events.UseNickname */, socketIdInputElement.value);
    setInterval(() => {
        socket.emit("10" /* Events.Match */, connectionInputElement.value);
    }, 100);
});
socket.on("9" /* Events.MatchedFailed */, () => {
    connectionStateElement.innerHTML = "Desconectado";
});
socket.on("8" /* Events.MatchedSuccessFully */, () => {
    connectionStateElement.innerHTML = "Conectado";
});
socketIdInputElement.addEventListener("change", () => {
    localStorage.setItem("dss:nickname", socketIdInputElement.value);
    socket.emit("11" /* Events.UseNickname */, socketIdInputElement.value);
});
clientNameInputElement.addEventListener("click", () => {
    localStorage.setItem("dss:username", clientNameInputElement.value);
});
sendMessageButton.addEventListener("click", () => {
    if (IsConnected()) {
        const message = {
            meta: GetMeta(socket),
            name: GetUserName(),
            body: GetMessage(),
        };
        messageElement.appendChild(createMessageTemplate(message));
        socket.emit("7" /* Events.SendMessage */, message);
    }
});
sendFilesButton.addEventListener("click", async () => {
    if (GetMediaSize() > 1048576 /* Sizes.MegaByte */ * 45) {
        return alert(`El paquete que quiere enviar pesa mas de 45MB`);
    }
    if (IsConnected()) {
        const packet = {
            data: await GetMedia(),
            meta: GetMeta(socket),
            name: GetUserName(),
        };
        socket.emit("3" /* Events.SendMultimedia */, packet);
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
//# sourceMappingURL=listeners.js.map