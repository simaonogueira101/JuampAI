"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const app = new hono_1.Hono();
app.get("/", (c) => c.text("Hello from hono!"));
const start = () => {
    (0, node_server_1.serve)({
        fetch: app.fetch,
        port: config_1.config.server.port,
    }, (info) => {
        console.log(`Server listening on ${info.port}`);
    });
};
start();
//# sourceMappingURL=index.js.map