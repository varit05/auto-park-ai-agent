import { Router } from "express";
import { weatherRouter } from "./weather.router";
import { healthRouter } from "./health.router";

const router: Router = Router();

router.use("/health", healthRouter);
router.use("/weather", weatherRouter);

export const apiRouter: Router = router;
