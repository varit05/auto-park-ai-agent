import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";

export interface ApiErrorResponse {
  status: string;
  timestamp: string;
  error: {
    message: string;
    code: number;
  };
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.status = statusCode;
    this.name = "ApiError";
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error & { status?: number },
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  const statusCode = err.status || 500;

  const response: ApiErrorResponse = {
    status: "ERROR",
    timestamp: new Date().toISOString(),
    error: {
      message: err.message || "Internal Server Error",
      code: statusCode
    }
  };

  res.status(statusCode).json(response);
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next(new ApiError(`Route ${req.method} ${req.path} not found`, 404));
};