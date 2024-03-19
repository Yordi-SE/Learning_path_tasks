"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config.env' });
require("express-async-errors");
const server_1 = require("./utils/server");
const db_1 = require("./model/db");
const app = (0, server_1.createApp)();
const hostname = process.env.HOSTNAME || '127.0.0.1';
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

(0, db_1.db)();
app.listen(port, hostname, () => {
    console.log('Express Server is started at ' + port);
});
