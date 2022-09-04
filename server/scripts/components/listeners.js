import { showConnection, showDisconnect, showMessage, showPackage } from "../debug/conn.js";
import { socket, connections, findConnIdByNickname } from "./socket.js";
socket.on("connection", (client) => {
    connections[client.id] = { nickname: client.id, id: client.id };
    showConnection(connections[client.id]);
    client.on("3" /* Events.SendMultimedia */, (pack) => {
        const id = findConnIdByNickname(pack.meta.to);
        showPackage(pack);
        if (id) {
            if (id === client.id) {
                return client.emit("1" /* Events.IncomingMultimedia */, pack);
            }
            return client.to(id).emit("1" /* Events.IncomingMultimedia */, pack);
        }
        return client.emit("0" /* Events.MultimediaNotReceived */);
    });
    client.on("2" /* Events.MultimediaReceive */, (from) => {
        const id = findConnIdByNickname(from);
        if (id) {
            if (id === client.id) {
                return client.emit("2" /* Events.MultimediaReceive */);
            }
            return client.to(from).emit("2" /* Events.MultimediaReceive */);
        }
    });
    client.on("7" /* Events.SendMessage */, (msg) => {
        const id = findConnIdByNickname(msg.meta.to);
        showMessage(msg);
        if (id) {
            if (id === client.id) {
                return client.emit("5" /* Events.IncomingMessage */, msg);
            }
            return client.to(id).emit("5" /* Events.IncomingMessage */, msg);
        }
        return client.emit("4" /* Events.MessageNotReceived */);
    });
    client.on("6" /* Events.MessageReceived */, (from) => {
        const id = findConnIdByNickname(from);
        if (id) {
            if (id === client.id) {
                return client.emit("6" /* Events.MessageReceived */);
            }
            return client.to(from).emit("6" /* Events.MessageReceived */);
        }
    });
    client.on("10" /* Events.Match */, (nickname) => {
        const id = findConnIdByNickname(nickname);
        if (id) {
            client.emit("8" /* Events.MatchedSuccessFully */);
        }
        else {
            client.emit("9" /* Events.MatchedFailed */);
        }
    });
    client.on("11" /* Events.UseNickname */, (nickname) => {
        const existNickname = Object.values(connections).some((connection) => connection.nickname === nickname && connection.id !== client.id);
        if (existNickname) {
            client.emit("12" /* Events.NicknameUsed */);
        }
        else {
            connections[client.id].nickname = nickname;
        }
    });
    client.on("disconnect", () => {
        showDisconnect(connections[client.id]);
        delete connections[client.id];
    });
});
//# sourceMappingURL=listeners.js.map