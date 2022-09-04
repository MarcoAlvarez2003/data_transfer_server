import { fileInputElement } from "./interface.js";
import { ReadMedia } from "../../components/fs.js";
export async function GetMultimediaPreview() {
    const media = {};
    if (fileInputElement.files) {
        for (const file of Array.from(fileInputElement.files)) {
            const body = await ReadMedia(file);
            media[file.name] = {
                name: file.name,
                type: file.type,
                size: file.size,
                body,
            };
        }
    }
    return media;
}
export function GetMediaSize() {
    let size = 0;
    if (fileInputElement.files) {
        for (const file of Array.from(fileInputElement.files)) {
            size += file.size;
        }
    }
    return size;
}
//# sourceMappingURL=fs.js.map