import { socket, connections, findConnIdByNickname } from "./socket.js";
import { Package } from "../types/package.js";
import { Message } from "../types/message.js";
import { Events } from "./events.js";

socket.on("connection", (client) => {
    connections[client.id] = { nickname: client.id, id: client.id };

    console.log(`New Connection`, connections[client.id]);

    client.on(Events.SendMultimedia, (pack: Package) => {
        const id = findConnIdByNickname(pack.meta.to);

        if (id) {
            if (id === client.id) {
                return client.emit(Events.IncomingMultimedia, pack);
            }

            return client.to(id).emit(Events.IncomingMultimedia, pack);
        }

        return client.emit(Events.MultimediaNotReceived);
    });

    client.on(Events.MultimediaReceive, (from: string) => {
        const id = findConnIdByNickname(from);

        if (id) {
            if (id === client.id) {
                return client.emit(Events.MultimediaReceive);
            }

            return client.to(from).emit(Events.MultimediaReceive);
        }
    });

    client.on(Events.SendMessage, (msg: Message) => {
        const id = findConnIdByNickname(msg.meta.to);

        if (id) {
            if (id === client.id) {
                return client.emit(Events.IncomingMessage, msg);
            }

            return client.to(id).emit(Events.IncomingMessage, msg);
        }

        return client.emit(Events.MessageNotReceived);
    });

    client.on(Events.MessageReceived, (from: string) => {
        const id = findConnIdByNickname(from);

        if (id) {
            if (id === client.id) {
                return client.emit(Events.MessageReceived);
            }

            return client.to(from).emit(Events.MessageReceived);
        }
    });

    client.on(Events.Match, (nickname: string) => {
        const id = findConnIdByNickname(nickname);

        if (id) {
            client.emit(Events.MatchedSuccessFully);
        } else {
            client.emit(Events.MatchedFailed);
        }
    });

    client.on(Events.UseNickname, (nickname: string) => {
        const existNickname = Object.values(connections).some((connection) => connection.nickname === nickname && connection.id !== client.id);

        if (existNickname) {
            client.emit(Events.NicknameUsed);
        } else {
            connections[client.id].nickname = nickname;
        }
    });

    client.on("disconnect", () => {
        console.log(`Lost Connection`, connections[client.id]);

        delete connections[client.id];
    });
});
