import { createMultimediaTemplate } from "../../../utils/template.js";
import { GetMedia } from "../../../components/database.js";
import { Multimedia } from "../../../types/multimedia.js";

/**
 * Crea un fragmento con eventos desde la base de datos
 * @returns {Promise<DocumentFragment>}
 */
export async function createTemplateFragmentFromDataBase(): Promise<DocumentFragment> {
    const fragment = document.createDocumentFragment();

    for (const multimedia of await GetMedia()) {
        const template = createMultimediaTemplate(multimedia);

        template.addEventListener("contextmenu", () => {
            location.assign("/admin.html");
        });

        fragment.appendChild(template);
    }

    return fragment;
}

/**
 * Crear un fragmento para previsualizar los archivos seleccionados
 * @param multimedias Archivos multimedia para previsualizar
 * @returns {DocumentFragment}
 */
export function createFragmentFromPreview(multimedias: Multimedia[]): DocumentFragment {
    const fragment = document.createDocumentFragment();

    for (const multimedia of multimedias) {
        fragment.appendChild(createMultimediaTemplate(multimedia));
    }

    return fragment;
}
