import { Router } from "express";
import { weatherRouter } from "./weather.router";
import { healthcheckService } from "../healthcheck";

const router: Router = Router();

router.use("/health", healthcheckService);
router.use("/weather", weatherRouter);

export const apiRouter: Router = router;
