import { Server } from "socket.io";
import { app } from "./server.js";
import http from "http";
const connections = {};
export const server = http.createServer(app);
export const socket = new Server(server, {
    maxHttpBufferSize: 1048576 /* Sizes.MegaByte */ * 50,
});
function findConnIdByNickname(nickname) {
    for (const id in connections) {
        const connection = connections[id];
        if (connection.nickname === nickname) {
            return connection.id;
        }
        if (connection.id === nickname) {
            return nickname;
        }
    }
}
socket.on("connection", (client) => {
    connections[client.id] = { nickname: client.id, id: client.id };
    console.log(`New Connection`, connections[client.id]);
    client.on("3" /* Events.SendMultimedia */, (pack) => {
        const id = findConnIdByNickname(pack.meta.to);
        if (id) {
            client.to(id).emit("1" /* Events.IncomingMultimedia */, pack);
        }
        else {
            client.emit("0" /* Events.MultimediaNotReceived */);
        }
    });
    client.on("2" /* Events.MultimediaReceive */, (from) => {
        const id = findConnIdByNickname(from);
        if (id) {
            client.to(from).emit("2" /* Events.MultimediaReceive */);
        }
    });
    client.on("7" /* Events.SendMessage */, (msg) => {
        const id = findConnIdByNickname(msg.meta.to);
        if (id) {
            client.to(id).emit("5" /* Events.IncomingMessage */, msg);
        }
    });
    client.on("6" /* Events.MessageReceived */, (from) => {
        const id = findConnIdByNickname(from);
        if (id) {
            client.to(from).emit("6" /* Events.MessageReceived */);
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
        console.log(`Lost Connection`, connections[client.id]);
        delete connections[client.id];
    });
});
//# sourceMappingURL=socket.js.map