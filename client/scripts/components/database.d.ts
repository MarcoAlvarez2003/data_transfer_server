import { Multimedia } from "../types/multimedia.js";
export declare const DB_KEY_MEDIA = "db:files";
export declare const DB_KEY_NAME = "dss:db";
export declare const DB_VERSION = 1;
export declare function CreateDataBase(): Promise<IDBDatabase>;
export declare function GetMedia(): Promise<Multimedia[]>;
export declare function DelMedia(name: string): Promise<void>;
export declare function SetMedia(media: Multimedia): Promise<IDBValidKey>;
//# sourceMappingURL=database.d.ts.map