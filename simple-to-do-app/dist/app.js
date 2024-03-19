"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const server_1 = require("./utils/server");
const db_1 = require("./model/db");
const app = (0, server_1.createApp)();
const hostname = '127.0.0.1';
const port = 3000;
(0, db_1.db)();
app.listen(port, hostname, () => {
    console.log('Express Server is started at ' + port);
});
