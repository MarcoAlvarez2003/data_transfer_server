/// <reference types="node" />
import { Server } from "socket.io";
import http from "http";
export interface Conn {
    nickname: string;
    id: string;
}
export declare const server: http.Server;
export declare const socket: Server<import("socket.io/dist/typed-events.js").DefaultEventsMap, import("socket.io/dist/typed-events.js").DefaultEventsMap, import("socket.io/dist/typed-events.js").DefaultEventsMap, any>;
//# sourceMappingURL=socket.d.ts.map