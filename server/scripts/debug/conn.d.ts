import { Conn } from "../components/socket.js";
import { Message } from "../types/message.js";
import { Package } from "../types/package.js";
export declare function showConnection(conn: Conn): void;
export declare function showDisconnect(conn: Conn): void;
export declare function showPackage(pack: Package): void;
export declare function showMessage(message: Message): void;
