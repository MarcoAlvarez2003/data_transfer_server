import { appBodyElement, historyElement, messageElement, previewElement } from "../components/interface.js";

if (window.matchMedia("(max-width: 500px)").matches) {
    const previewButton = document.createElement("button");
    const historyButton = document.createElement("button");
    const chatButton = document.createElement("button");

    const container = document.createElement("div");
    const toolbar = document.createElement("div");
    const content = document.createElement("div");

    appBodyElement.appendChild(container);
    container.appendChild(toolbar);
    container.appendChild(content);

    content.appendChild(previewElement.parentElement as HTMLDivElement);
    content.appendChild(messageElement.parentElement as HTMLDivElement);
    content.appendChild(historyElement);
    toolbar.appendChild(previewButton);
    toolbar.appendChild(chatButton);
    toolbar.appendChild(historyButton);

    container.style.height = "100%";
    container.style.width = "100%";

    toolbar.style.display = "flex";
    toolbar.style.padding = "5px";
    toolbar.style.height = "8%";

    content.style.height = "92%";
    content.style.width = "100%";

    previewButton.textContent = "preview";
    chatButton.textContent = "chat";
    historyButton.textContent = "archivos";

    previewButton.className = "button";
    chatButton.className = "button";
    historyButton.className = "button";

    previewButton.style.marginRight = "5px";
    historyButton.style.marginLeft = "5px";

    (messageElement.parentElement as HTMLDivElement).style.display = "none";
    historyElement.style.display = "none";

    previewButton.addEventListener("click", () => {
        (previewElement.parentElement as HTMLDivElement).style.display = "block";
        (messageElement.parentElement as HTMLDivElement).style.display = "none";
        historyElement.style.display = "none";
    });

    chatButton.addEventListener("click", () => {
        (messageElement.parentElement as HTMLDivElement).style.display = "block";
        (previewElement.parentElement as HTMLDivElement).style.display = "none";
        historyElement.style.display = "none";
    });

    historyButton.addEventListener("click", () => {
        (previewElement.parentElement as HTMLDivElement).style.display = "none";
        (messageElement.parentElement as HTMLDivElement).style.display = "none";
        historyElement.style.display = "block";
    });
}
