import { Multimedia } from "../../types/multimedia.js";
export declare const BASE_64_FILES: RegExp;
export declare const TEXT_FILES: RegExp;
export declare function ReadMedia(file: File): Promise<string>;
export declare function GetMedia(): Promise<Record<string, Multimedia>>;
export declare function GetMediaSize(): number;
//# sourceMappingURL=fs.d.ts.map