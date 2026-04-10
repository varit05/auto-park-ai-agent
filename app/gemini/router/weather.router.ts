import { Router } from 'express';
import { getWeather } from '../weather/weather.service';

const router: Router = Router();

router.get('/', getWeather);

export const weatherRouter: Router = router;