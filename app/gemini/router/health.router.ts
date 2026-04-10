import { Router } from "express";
import { healthcheckService } from "../healthcheck";

export const healthRouter: Router = Router();

healthRouter.get("/", healthcheckService);
