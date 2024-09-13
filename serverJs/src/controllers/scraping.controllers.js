import { serverScraping } from "../config/config.js";
import UrlService from "../services/UrlService.js";

class ScrapingCtrl {
    constructor() {
        this.server = serverScraping;
        this.urlService = new UrlService();
    }

    async processUrls(_req, res) {
        try {
            const urls = await this.urlService.getAll();
            const news = [];

            for (const url of urls) {
                const response = await fetch(this.server, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({url:url }),
                });

                const data = await response.json();
                news.push(data);
            }

            return res.json(news);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Error en el servidor" });
        }
    }
}

export default ScrapingCtrl;
