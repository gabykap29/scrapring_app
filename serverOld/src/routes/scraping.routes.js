import { Router } from "express";
import ScrapingCtrl from "../controllers/scraping.controllers.js";

const router = Router();
const scrapingCrtl = new ScrapingCtrl();

router.get('/scraping', scrapingCrtl.getData.bind(scrapingCrtl));


export default router;