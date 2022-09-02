import path from "path";
import url from "url";

export const PORT = process.env.PORT || 8080;
export const DIRNAME = path.join(path.dirname(url.fileURLToPath(import.meta.url)), "../../../");
