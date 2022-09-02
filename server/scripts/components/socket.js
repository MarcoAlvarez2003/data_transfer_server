import { Server } from "socket.io";
import { app } from "./server.js";
import http from "http";
export const connections = {};
export const server = http.createServer(app);
export const socket = new Server(server, {
    maxHttpBufferSize: 1048576 /* Sizes.MegaByte */ * 50,
});
export function findConnIdByNickname(nickname) {
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
//# sourceMappingURL=socket.js.map