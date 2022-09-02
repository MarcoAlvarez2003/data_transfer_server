import { server } from "./components/socket.js";
import { PORT } from "./components/vars.js";

import "./components/handlers.js";

server.listen(PORT, () => {
    console.log(`listening on port ${PORT} - http://localhost:${PORT}/`);
});
