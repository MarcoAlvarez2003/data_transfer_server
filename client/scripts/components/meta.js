import { connectionInputElement, messageInputElement, clientNameInputElement, connectionStateElement } from "./interface.js";
export function GetConnectionId() {
    return connectionInputElement.value;
}
export function GetMessage() {
    return messageInputElement.value;
}
export function GetUserName() {
    return clientNameInputElement.value;
}
export function GetMeta(socket) {
    return { from: socket.id, to: GetConnectionId() };
}
export function IsConnected() {
    return connectionStateElement.innerHTML === "Conectado" ? true : false;
}
export function connectWhenReceivedData(socket, data) {
    if (!connectionInputElement.value.length || connectionInputElement.value !== data.from) {
        connectionInputElement.value = data.from;
    }
}
//# sourceMappingURL=meta.js.map