import { appBodyElement, historyElement, messageContainerElement, previewContainerElement } from "../../interface.js";
export function reset() {
    Array.from(appBodyElement.children).forEach((children) => children.remove());
    appBodyElement.appendChild(previewContainerElement);
    appBodyElement.appendChild(messageContainerElement);
    appBodyElement.appendChild(historyElement);
    previewContainerElement.style.display = "block";
    messageContainerElement.style.display = "block";
    historyElement.style.display = "block";
}
//# sourceMappingURL=reset.js.map