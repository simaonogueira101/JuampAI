"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
const PORT = process.env.PORT || "3000";
const CONCURRENCY = process.env.WEB_CONCURRENCY || "1";
exports.config = {
    server: {
        port: parseInt(PORT),
    },
    concurrency: parseInt(CONCURRENCY),
};
//# sourceMappingURL=index.js.map