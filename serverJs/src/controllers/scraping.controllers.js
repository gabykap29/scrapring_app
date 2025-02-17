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
      console.log(urls);
      const news = [];

      if (urls.length > 1) {
        for (const url of urls) {
          const response = await fetch(this.server, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: url }),
          });
          const data = await response.json();
          console.log(data);
          news.push(data);
  
          return res.json(news);
        }

      } else {
        const response = await fetch(this.server, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: urls[0] }),
        });
        const data = await response.json();
        console.log(data);
        news.push(data);

        return res.json(news);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }
  async findOneUrl(req,res) {
    try {
      const { url } = req.body;
      console.log(url);
      
      const response = await fetch(this.server,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      })
      const data = await response.json();
      console.log(data);
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error en el servidor" });
      
    }
  }
}

export default ScrapingCtrl;
