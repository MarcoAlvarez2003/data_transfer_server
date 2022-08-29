import { Package } from "../types/package.js";
import { Message } from "../types/message.js";
import { Events } from "./events.js";
import { Server } from "socket.io";
import { Sizes } from "./sizes.js";
import { app } from "./server.js";

import http from "http";

export interface Conn {
    nickname: string;
    id: string;
}

const connections: Record<string, Conn> = {};

export const server = http.createServer(app);
export const socket = new Server(server, {
    maxHttpBufferSize: Sizes.MegaByte * 50,
});

function findConnIdByNickname(nickname: string) {
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

    client.on(Events.SendMultimedia, (pack: Package) => {
        const id = findConnIdByNickname(pack.meta.to);

        if (id) {
            client.to(id).emit(Events.IncomingMultimedia, pack);
        } else {
            client.emit(Events.MultimediaNotReceived);
        }
    });

    client.on(Events.MultimediaReceive, (from: string) => {
        const id = findConnIdByNickname(from);

        if (id) {
            client.to(from).emit(Events.MultimediaReceive);
        }
    });

    client.on(Events.SendMessage, (msg: Message) => {
        const id = findConnIdByNickname(msg.meta.to);

        if (id) {
            client.to(id).emit(Events.IncomingMessage, msg);
        }
    });

    client.on(Events.MessageReceived, (from: string) => {
        const id = findConnIdByNickname(from);

        if (id) {
            client.to(from).emit(Events.MessageReceived);
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
