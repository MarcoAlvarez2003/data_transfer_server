export function createMultimediaTemplate(multimedia) {
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
export function createMessageTemplate(message) {
    const container = document.createElement("div");
    const name = document.createElement("strong");
    const text = document.createElement("span");
    name.textContent = message.name + ": ";
    text.textContent = message.body;
    container.appendChild(name);
    container.appendChild(text);
    return container;
}
//# sourceMappingURL=template.js.map