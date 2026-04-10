import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { apiRouter } from "./router";
import { logger } from "./lib/logger";
import { corsConfig } from "./config/cors.config";
import { errorHandler } from "./middleware/error.middleware";

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware - must be FIRST
app.use(helmet());

// CORS middleware
app.use(cors(corsConfig));

// Request logging middleware
app.use(pinoHttp({ logger }));

// Body parser middleware
app.use(express.json({ limit: "1mb" }));

// API Routes
app.use("/api", apiRouter);

// Global Error Handling Middleware - must be LAST
app.use(errorHandler);

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  logger.info(`Health check available at: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown handling
const shutdown = (signal: string) => {
  logger.info(`Received ${signal}, starting graceful shutdown`);

  server.close((err) => {
    if (err) {
      logger.error(err, "Error during server shutdown");
      process.exit(1);
    }

    logger.info("Server closed successfully");
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("uncaughtException", (err) => {
  logger.error(err, "Uncaught Exception");
  shutdown("uncaughtException");
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error({ promise, reason }, "Unhandled Rejection");
  shutdown("unhandledRejection");
});
