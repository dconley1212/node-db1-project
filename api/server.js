const express = require("express");
const cors = require("cors");
const accountsRouter = require("./accounts/accounts-router");

const server = express();

server.use(express.json());
server.use(cors());
server.use("/api/accounts", accountsRouter);

module.exports = server;
