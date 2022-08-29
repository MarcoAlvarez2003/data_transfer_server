import { Multimedia } from "./multimedia.js";
import { MetaData } from "./metadata.js";

export interface Package {
    data: Record<string, Multimedia>;
    meta: MetaData;
    name: string;
}
