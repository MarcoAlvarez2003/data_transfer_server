import { Multimedia } from "../types/multimedia.js";
import { Message } from "../types/message.js";
export declare function createMultimediaTemplate(multimedia: Multimedia): HTMLAnchorElement | HTMLImageElement | HTMLAudioElement | HTMLVideoElement | HTMLParagraphElement;
export declare function createMessageTemplate(message: Message): HTMLDivElement;
export declare function createFragmentFromDataBase(): Promise<DocumentFragment>;
//# sourceMappingURL=template.d.ts.map