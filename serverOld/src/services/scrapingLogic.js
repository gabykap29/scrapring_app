import { extract } from '@extractus/article-extractor';
import axios from 'axios';

class Scraping {
    constructor() {}

    async getInformation(url) {
        try {
            const articles = [];
            const extractedData = await extract(url);

            // Verifica que se haya extraído contenido
            if (extractedData && Array.isArray(extractedData.links)) {
                for (const link of extractedData.links) {
                    // Realiza una solicitud a cada enlace
                    const articleContent = await this.fetchArticleContent(link);
                    const article = {
                        title: extractedData.title || "No title",
                        url: link,
                        description: extractedData.description || "",
                        image: extractedData.image || "",
                        content: articleContent || "", // Contenido del artículo
                        author: extractedData.author || "No author",
                        source: extractedData.source || "",
                        published: extractedData.published || "No published date",
                        ttr: extractedData.ttr || "No time to read"
                    };

                    // Agrega el artículo a la lista
                    articles.push(article);
                }
            }

            console.log("Extracted Articles:", articles);
            return articles;
        } catch (error) {
            console.log("Error al obtener datos desde la URL:", error);
            return [];
        }
    }

    // Método para hacer una solicitud HTTP y obtener el contenido del artículo
    async fetchArticleContent(url) {
        try {
            const response = await axios.get(url);
            // Puedes procesar el contenido aquí si es necesario
            return response.data;
        } catch (error) {
            console.error(`Error al recuperar ${url}: ${error.message}`);
            return null;
        }
    }

    async processData(article) {
        try {
            // Si el artículo ya fue extraído en getInformation, este método puede ser innecesario
            return article;
        } catch (error) {
            console.log("Error al procesar el contenido del artículo:", error);
            return article;
        }
    }
}

export default Scraping;
