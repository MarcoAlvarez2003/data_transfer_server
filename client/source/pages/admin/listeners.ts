import { deleteButtonElement, previewElement } from "./interface.js";
import { createMultimediaTemplate } from "../../utils/template.js";
import { GetMedia, DelMedia } from "../../components/database.js";

window.addEventListener("load", async () => {
    let currentFileReference!: string | undefined;
    let currentTemplate!: HTMLElement | undefined;

    const show = async () => {
        Array.from(previewElement.children).forEach((children) => children.remove());

        const fragment = document.createDocumentFragment();
        const media = await GetMedia();

        for (const file of Object.values(media)) {
            const template = createMultimediaTemplate(file);

            template.addEventListener("click", (e) => {
                currentFileReference = file.name;
                currentTemplate = template;

                deleteButtonElement.textContent = "Borrar";
                deleteButtonElement.disabled = false;

                template.style.boxShadow = "0 0 5px #fff";

                e.stopPropagation();
            });

            fragment.appendChild(template);
        }
        previewElement.appendChild(fragment);
    };

    deleteButtonElement.textContent = "...";
    deleteButtonElement.disabled = true;

    window.addEventListener("click", () => {
        deleteButtonElement.textContent = "...";
        deleteButtonElement.disabled = true;

        if (currentFileReference) {
            currentFileReference = undefined;
        }

        if (currentTemplate) {
            currentTemplate.style.boxShadow = "0 0 0 transparent";
            currentTemplate = undefined;
        }
    });

    deleteButtonElement.addEventListener("click", async () => {
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
