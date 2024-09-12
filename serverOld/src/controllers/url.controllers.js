import UrlService from "../services/UrlService.js";

class UrlCtrl {
  constructor() {
    this.urlService = new UrlService();
  }

  // Obtener todas las URLs
  async getUrls(_req, res) {
    try {
      const urls = this.urlService.getAll(); 

      if (!urls) {
        return res.status(404).json({
          statusCode: 404,
          message: "Aún no se han añadido URLs",
        });
      }

      return res.status(200).json(urls); // Si todo está bien, devuelve las URLs
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Error interno del servidor al obtener las URLs",
      });
    }
  }

  // Añadir una nueva URL
  async addUrlToDb(req, res) {
    try {
      const {url} = req.body;

      if (!url) {
        return res.status(400).json({
          statusCode: 400,
          message: "Falta el campo URL",
        });
      }

      const newUrl = this.urlService.addUrl(url);

      if (!newUrl) {
        return res.status(400).json({
          statusCode: 400,
          message: "Error al añadir la URL",
        });
      }

      return res.status(201).json({message: "Url añadida!"}); // Devolver la URL añadida correctamente
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Error interno del servidor al añadir la URL...",
      });
    }
  }
}

export default UrlCtrl;
