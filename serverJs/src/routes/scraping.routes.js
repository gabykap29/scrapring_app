import ScrapingCtrl from "../controllers/scraping.controllers.js";
import { Router } from "express";

const router = Router();

const scrapingCtrl = new ScrapingCtrl();

router.get('/scraping',scrapingCtrl.processUrls.bind(scrapingCtrl));

export default router;