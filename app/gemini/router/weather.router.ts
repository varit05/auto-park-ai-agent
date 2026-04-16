import { Router } from 'express';
import { getWeatherAgent } from "../weather/weather.service";

const router: Router = Router();

router.post("/", getWeatherAgent);

export const weatherRouter: Router = router;