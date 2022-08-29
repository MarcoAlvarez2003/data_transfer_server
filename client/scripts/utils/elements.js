export function createElement(tag, classes, id) {
    const element = document.createElement(tag);
    if (classes) {
        element.classList.add(...classes);
    }
    if (id) {
        element.id = id;
    }
    return element;
}
//# sourceMappingURL=elements.js.map