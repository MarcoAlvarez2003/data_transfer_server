export const DB_KEY_MEDIA = "db:files";
export const DB_KEY_NAME = "dss:db";
export const DB_VERSION = 1;
export function CreateDataBase() {
    return new Promise((resolve, reject) => {
        try {
            const request = window.indexedDB.open(DB_KEY_NAME, DB_VERSION);
            request.addEventListener("upgradeneeded", () => {
                request.result.createObjectStore(DB_KEY_MEDIA, {
                    keyPath: "name",
                });
                resolve(request.result);
            });
            request.addEventListener("success", () => {
                resolve(request.result);
            });
        }
        catch (e) {
            reject(e);
        }
    });
}
export function GetMedia() {
    return new Promise(async (resolve, reject) => {
        const database = await CreateDataBase();
        const media = [];
        const transaction = database.transaction(DB_KEY_MEDIA, "readonly");
        const storage = transaction.objectStore(DB_KEY_MEDIA);
        const cursor = storage.openCursor();
        cursor.addEventListener("success", () => {
            if (cursor.result) {
                media.push(cursor.result.value);
                return cursor.result.continue();
            }
            resolve(media);
        });
    });
}
export function DelMedia(name) {
    return new Promise(async (resolve, reject) => {
        const database = await CreateDataBase();
        const transaction = database.transaction(DB_KEY_MEDIA, "readwrite");
        const storage = transaction.objectStore(DB_KEY_MEDIA);
        const task = storage.delete(name);
        task.addEventListener("success", () => {
            resolve();
        });
        task.addEventListener("error", () => {
            reject(task.error);
        });
    });
}
export function SetMedia(media) {
    return new Promise(async (resolve, reject) => {
        const database = await CreateDataBase();
        const transaction = database.transaction(DB_KEY_MEDIA, "readwrite");
        const storage = transaction.objectStore(DB_KEY_MEDIA);
        const task = storage.add(media);
        task.addEventListener("success", () => {
            resolve(task.result);
        });
    });
}
//# sourceMappingURL=database.js.map