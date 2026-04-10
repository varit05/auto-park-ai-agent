import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { apiRouter } from "./router";
import { logger } from "./lib/logger";

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware - must be FIRST
app.use(helmet());

// CORS middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Request logging middleware
app.use(pinoHttp({ logger }));

// Body parser middleware
app.use(express.json());

// API Routes
app.use("/api", apiRouter);

// Global Error Handling Middleware - must be LAST
app.use((err: Error & { status?: number }, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    status: "ERROR",
    timestamp: new Date().toISOString(),
    error: {
      message: err.message || "Internal Server Error",
      code: statusCode
    }
  });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
