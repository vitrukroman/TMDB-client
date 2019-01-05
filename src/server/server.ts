import express from "express";
import logger from "../logger";
import serverConfig from "./serverConfig";

const server = express();

server.listen(serverConfig.port, () => {
  logger.info(`Listening at port ${serverConfig.port}`);
});
