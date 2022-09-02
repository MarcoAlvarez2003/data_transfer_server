import { appBodyElement, historyElement, messageContainerElement, previewContainerElement } from "../../interface.js";
export function resetDesign() {
    Array.from(appBodyElement.children).forEach((children) => children.remove());
    appBodyElement.appendChild(previewContainerElement);
    appBodyElement.appendChild(messageContainerElement);
    appBodyElement.appendChild(historyElement);
    previewContainerElement.style.display = "block";
    messageContainerElement.style.display = "block";
    historyElement.style.display = "block";
}
//# sourceMappingURL=design.js.map