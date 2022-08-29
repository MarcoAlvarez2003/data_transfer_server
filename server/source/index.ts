import { server, socket } from "./components/socket.js";
import { PORT } from "./components/constants.js";

server.listen(PORT, () => {
    console.log(`listening on port ${PORT} - http://localhost:${PORT}/`);
});
