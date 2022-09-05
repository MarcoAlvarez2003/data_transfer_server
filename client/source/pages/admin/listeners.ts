import { createMultimediaTemplate } from "../../components/template.js";
import { GetMedia, DelMedia } from "../../components/database.js";
import * as Interface from "./interface.js";

window.addEventListener("load", async () => {
    let currentFileReference!: string | undefined;
    let currentTemplate!: HTMLElement | undefined;

    const show = async () => {
        Array.from(Interface.previewElement.children).forEach((children) => children.remove());

        const fragment = document.createDocumentFragment();
        const media = await GetMedia();

        for (const file of Object.values(media)) {
            const template = createMultimediaTemplate(file);

            template.addEventListener("click", (e) => {
                currentFileReference = file.name;
                currentTemplate = template;

                Interface.deleteButtonElement.textContent = "Borrar";
                Interface.deleteButtonElement.disabled = false;

                template.style.boxShadow = "0 0 5px #fff";

                e.stopPropagation();
            });

            fragment.appendChild(template);
        }
        Interface.previewElement.appendChild(fragment);
    };

    Interface.deleteButtonElement.textContent = "...";
    Interface.deleteButtonElement.disabled = true;

    window.addEventListener("click", () => {
        Interface.deleteButtonElement.textContent = "...";
        Interface.deleteButtonElement.disabled = true;

        if (currentFileReference) {
            currentFileReference = undefined;
        }

        if (currentTemplate) {
            currentTemplate.style.boxShadow = "0 0 0 transparent";
            currentTemplate = undefined;
        }
    });

    Interface.deleteButtonElement.addEventListener("click", async () => {
        if (currentFileReference) {
            await DelMedia(currentFileReference);

            if (currentTemplate) {
                currentTemplate.remove();
            }

            await show();
        }
    });

    await show();
});
