import { readdir, stat } from "fs/promises";
import { DIRNAME } from "./vars.js";
import { join } from "path";
export async function getShareFolder() {
    const files = {};
    const read = async (path) => {
        for (const filename of await readdir(path, { encoding: "utf-8" })) {
            const dirname = join(path, filename);
            const state = await stat(dirname);
            if (state.isDirectory()) {
                await read(dirname);
            }
            else {
                files[dirname] = filename;
            }
        }
    };
    await read(join(DIRNAME, "shared"));
    return files;
}
//# sourceMappingURL=shared.js.map