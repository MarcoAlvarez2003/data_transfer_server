import { MetaData } from "../../types/metadata.js";
import { Socket } from "../../types/socket.js";
export declare function GetConnectionId(): string;
export declare function GetMessage(): string;
export declare function GetUserName(): string;
export declare function GetMeta(socket: Socket): MetaData;
export declare function IsConnected(): boolean;
export declare function connectWhenReceivedData(socket: Socket, data: MetaData): void;
//# sourceMappingURL=meta.d.ts.map