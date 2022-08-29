export function createElement(tag: keyof HTMLElementTagNameMap, classes?: string[], id?: string) {
    const element = document.createElement(tag);

    if (classes) {
        element.classList.add(...classes);
    }

    if (id) {
        element.id = id;
    }

    return element;
}
