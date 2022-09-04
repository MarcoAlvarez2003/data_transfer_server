import { Conn } from "../components/socket.js";
import { Message } from "../types/message.js";
import { Package } from "../types/package.js";
import { createHmac } from "node:crypto";

export function showConnection(conn: Conn) {
    console.log("Socket conectado");
    console.log();

    console.log("Socket - ID", conn.id);
    console.log("Socket - Nickname", conn.nickname);
    console.log();

    console.log("-----");
}

export function showDisconnect(conn: Conn) {
    console.log("Socket desconectado");
    console.log();

    console.log("Socket - ID", conn.id);
    console.log("Socket - Nickname", conn.nickname);
    console.log();

    console.log("-----");
}

export function showPackage(pack: Package) {
    console.log("Paquete recibido");
    console.log();

    console.log("Enviado por", pack.meta.from);
    console.log("Destinado a", pack.meta.to);
    console.log();

    console.log("Nombre del emisor", pack.name);
    console.log();

    console.log("Datos a retransmitir");

    for (const name in pack.data) {
        const body = pack.data[name];

        console.log("\t" + `nombre ${createHmac("sha256", "secret").update(`${body.name}`).digest("hex")}`);
        console.log("\t" + `tamaño ${createHmac("sha256", "secret").update(`${body.size}`).digest("hex")}`);
        console.log("\t" + `tipo ${createHmac("sha256", "secret").update(`${body.type}`).digest("hex")}`);
        console.log();
    }

    console.log("-----");
}

export function showMessage(message: Message) {
    console.log("Mensaje recibido");
    console.log();

    console.log("Enviado por", message.meta.from);
    console.log("Destinado a", message.meta.to);
    console.log();

    console.log("Nombre del emisor", message.name);
    console.log();

    console.log("Datos [encriptados]");
    console.log("\t" + createHmac("sha256", "secret").update(message.body).digest("hex"));

    console.log();
    console.log("-----");
}
