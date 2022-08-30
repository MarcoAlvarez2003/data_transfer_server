import { GetMedia } from "../components/database.js";
import { Multimedia } from "../types/multimedia.js";
import { Message } from "../types/message.js";

export function createMultimediaTemplate(
    multimedia: Multimedia
): HTMLAnchorElement | HTMLImageElement | HTMLAudioElement | HTMLVideoElement | HTMLParagraphElement {
    switch (multimedia.type) {
        case "application/x-msdownload":
        case "application/pdf":
            const link = document.createElement("a");
            link.textContent = multimedia.name;
            link.download = multimedia.name;
            link.href = multimedia.body;
            link.className = "a";
            return link;

        case "image/webp":
        case "image/jpeg":
        case "image/png":
        case "image/gif":
            const image = document.createElement("img");
            image.src = multimedia.body;
            image.alt = multimedia.name;
            image.className = "image";
            return image;

        case "audio/ogg":
        case "audio:wav":
        case "audio/mp3":
            const audio = document.createElement("audio");
            audio.src = multimedia.body;
            audio.className = "audio";
            audio.controls = true;
            return audio;

        case "video/webp":
        case "video/mp4":
            const video = document.createElement("video");
            video.src = multimedia.body;
            video.className = "video";
            video.controls = true;
            return video;

        default:
            const paragraph = document.createElement("p");
            paragraph.innerHTML = multimedia.body;
            return paragraph;
    }
}

export function createMessageTemplate(message: Message) {
    const container = document.createElement("div");
    const name = document.createElement("strong");
    const text = document.createElement("span");

    name.textContent = message.name + ": ";
    text.textContent = message.body;

    container.appendChild(name);
    container.appendChild(text);

    return container;
}

export async function createFragmentFromDataBase() {
    const fragment = document.createDocumentFragment();
    const media = await GetMedia();

    for (const multimedia of Object.values(media)) {
        const template = createMultimediaTemplate(multimedia);

        template.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            location.assign("/admin.html");
        });

        fragment.appendChild(template);
    }

    return fragment;
}
