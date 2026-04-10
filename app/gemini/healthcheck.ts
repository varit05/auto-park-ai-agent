import { Request, Response } from 'express';

export const healthcheckService = (_: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'Server is running'
  });
};