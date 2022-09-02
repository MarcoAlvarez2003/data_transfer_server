import { fileInputElement } from "./interface.js";
export const BASE_64_FILES = /(application\/x-msdownload|application\/pdf|image|video|audio)/;
export const TEXT_FILES = /(application\/json|text\/plain)/;
export function ReadMedia(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            if (reader.result)
                resolve(reader.result?.toString());
        });
        reader.addEventListener("error", () => {
            reject(reader.error);
        });
        if (BASE_64_FILES.test(file.type)) {
            reader.readAsDataURL(new Blob([file], file));
        }
        if (TEXT_FILES.test(file.type)) {
            reader.readAsText(new Blob([file], file));
        }
    });
}
export async function GetMedia() {
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