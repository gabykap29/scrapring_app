import { Router } from "express";
import UrlCtrl from "../controllers/url.controllers.js";

const router = Router();
const urlCtrl = new UrlCtrl();


router.get('/urls', urlCtrl.getUrls.bind(urlCtrl))
router.post('/urls', urlCtrl.addUrlToDb.bind(urlCtrl))

export default router;