import { Server } from "socket.io";
import { Sizes } from "./sizes.js";
import { app } from "./server.js";

import http from "http";

export interface Conn {
    nickname: string;
    id: string;
}

export const connections: Record<string, Conn> = {};

export const server = http.createServer(app);
export const socket = new Server(server, {
    maxHttpBufferSize: Sizes.MegaByte * 50,
});

export function findConnIdByNickname(nickname: string) {
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
