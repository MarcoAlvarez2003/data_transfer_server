import { createMultimediaTemplate } from "../../../components/template.js";
import { GetMedia } from "../../../components/database.js";
/**
 * Crea un fragmento con eventos desde la base de datos
 * @returns {Promise<DocumentFragment>}
 */
export async function createTemplateFragmentFromDataBase() {
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
export function createFragmentFromPreview(multimedias) {
    const fragment = document.createDocumentFragment();
    for (const multimedia of multimedias) {
        fragment.appendChild(createMultimediaTemplate(multimedia));
    }
    return fragment;
}
//# sourceMappingURL=template.js.map