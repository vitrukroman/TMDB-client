import express from "express";
import serverConfig from "./serverConfig";
import logger from "../logger";

const server = express();


server.listen(serverConfig.port, () => {
  logger.info(`Listening at port ${serverConfig.port}`)
});
