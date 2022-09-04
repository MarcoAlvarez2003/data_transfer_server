export const BASE_64_FILES = /(application\/x-msdownload|application\/pdf|image|video|audio)/;
export const TEXT_FILES = /(application\/json|text\/plain)/;

export function ReadMedia(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            if (reader.result) resolve(reader.result?.toString());
        });

        reader.addEventListener("error", () => {
            reject(reader.error);
        });

        if (BASE_64_FILES.test(file.type)) {
            reader.readAsDataURL(new Blob([file], file));
        }

        if (TEXT_FILES.test(file.type)) {
            reader.readAsText(new Blob([file], file));
        }
    });
}
