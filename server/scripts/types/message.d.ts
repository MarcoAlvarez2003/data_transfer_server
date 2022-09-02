import { MetaData } from "./metadata.js";
export interface Message {
    meta: MetaData;
    name: string;
    body: string;
}
