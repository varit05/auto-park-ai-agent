import express from "express";
import pinoHttp from "pino-http";
import { apiRouter } from "./router";
import { logger } from "./lib/logger";

const app = express();
const PORT = process.env.PORT || 3000;

// Request logging middleware
app.use(pinoHttp({ logger }));

app.use(express.json());
app.use("/api", apiRouter);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
