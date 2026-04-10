import { CorsOptions } from "cors";

const isProduction = process.env.NODE_ENV === "production";

export const corsConfig: CorsOptions = {
  origin: isProduction
    ? process.env.ALLOWED_ORIGINS?.split(",") || []
    : "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400 // 24 hours preflight cache
};