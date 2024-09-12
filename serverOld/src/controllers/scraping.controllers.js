import Scraping from "../services/scrapingLogic.js";
import UrlService from "../services/UrlService.js";

class ScrapingCtrl {
    constructor() {
        this.ScrapingService = new Scraping();
        this.urlService = new UrlService();
    }

    async getData(_req, res) {
        try {
            const allContent = [];  // Para almacenar todo el contenido procesado
            const urls = await this.urlService.getAll();
            console.log("Obteniendo las URLs: ", urls);

            for (let i = 0; i < urls.length; i++) {
                // 1. Extraer los artículos de la URL actual
                let articles = await this.ScrapingService.getInformation(urls[i]);
                console.log(articles);

                if (!articles || articles.length === 0) {
                    return res.status(400).json({
                        status: 400, message: "Error al obtener las URLs"
                    });
                }

                // 2. Procesar cada artículo individual
                for (let article of articles) {
                    const processedArticle = await this.ScrapingService.processData(article);
                    allContent.push(processedArticle);  // Guardar el artículo procesado
                }
            }

            // 3. Enviar la respuesta con todos los artículos procesados
            return res.status(201).json({ content: allContent });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500, message: "Error interno del servidor al procesar las URLs"
            });
        }
    }
}

export default ScrapingCtrl;
