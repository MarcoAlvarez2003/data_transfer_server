import { appBodyElement, historyElement, messageContainerElement, previewContainerElement } from "../interface.js";
import { createElement } from "../../../utils/elements.js";
import { reset } from "./utils/reset.js";
function applyPhoneDesign() {
    if (window.matchMedia("(max-width: 500px)").matches) {
        alert("Soporte para teléfonos en desarrollo");
        return history.back();
        const showPreviewButton = createElement("button", ["button"]);
        const showMessageButton = createElement("button", ["button"]);
        const showHistoryButton = createElement("button", ["button"]);
        const phoneDesignContainer = createElement("div");
        const phoneDesignHeader = createElement("div");
        const phoneDesignBody = createElement("div");
        showPreviewButton.textContent = "Ver Vista Previa";
        showMessageButton.textContent = "Ver Mensajes";
        showHistoryButton.textContent = "Ver Archivos";
        phoneDesignContainer.setAttribute("style", `
                height: 100%;
                width : 100%;
            `);
        phoneDesignHeader.setAttribute("style", `
                display: flex;
                padding: 5px ;
                height : 8%  ;
            `);
        phoneDesignBody.setAttribute("style", `
                height: 92% ;
                width : 100%;
            `);
        showPreviewButton.setAttribute("style", `
                margin-right: 5px;
            `);
        showHistoryButton.setAttribute("style", `
                margin-left: 5px;
            `);
        phoneDesignContainer.appendChild(phoneDesignHeader);
        phoneDesignContainer.appendChild(phoneDesignBody);
        phoneDesignHeader.appendChild(showPreviewButton);
        phoneDesignHeader.appendChild(showMessageButton);
        phoneDesignHeader.appendChild(showHistoryButton);
        phoneDesignBody.appendChild(previewContainerElement);
        phoneDesignBody.appendChild(messageContainerElement);
        phoneDesignBody.appendChild(historyElement);
        showPreviewButton.addEventListener("click", () => {
            previewContainerElement.style.display = "block";
            messageContainerElement.style.display = "none";
            historyElement.style.display = "none";
        });
        showMessageButton.addEventListener("click", () => {
            messageContainerElement.style.display = "block";
            previewContainerElement.style.display = "none";
            historyElement.style.display = "none";
        });
        showHistoryButton.addEventListener("click", () => {
            previewContainerElement.style.display = "none";
            messageContainerElement.style.display = "none";
            historyElement.style.display = "block";
        });
        previewContainerElement.style.display = "block";
        messageContainerElement.style.display = "none";
        historyElement.style.display = "none";
        appBodyElement.appendChild(phoneDesignContainer);
    }
    else {
        reset();
    }
}
window.addEventListener("resize", () => {
    applyPhoneDesign();
});
applyPhoneDesign();
//# sourceMappingURL=phone.js.map