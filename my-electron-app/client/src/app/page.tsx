"use client";
import {  useState } from "react";
import { FaClipboard, FaExternalLinkAlt, FaCloudDownloadAlt  } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import dayjs from "dayjs";

// Definir el tipo para el ítem de datos
interface Item {
  title: string;
  description: string;
  date_from_url: string;
  date_from_page: string;
  content: string;
  url: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const day = dayjs(new Date()).format("DD-MM-YYYY");

  const handleFetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/scraping", {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      const result = await response.json();
      setData(result[0] || []);  // Asegurarse de que siempre haya un array
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar los datos según el término de búsqueda
  const filteredData = data.length > 0 ? data.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.date_from_url.toLowerCase().includes(searchLower) ||
      item.date_from_page.toLowerCase().includes(searchLower)
    );
  }) : [];

  // Función para copiar contenido
  const handleCopy = (item: Item) => {
    const content = `Título: ${item.title}\nFecha desde la URL: ${item.date_from_url}\nFecha desde la página: ${item.date_from_page}\nDescripción: ${item.description}\nContenido: ${item.content}`;
    navigator.clipboard.writeText(content)
      .then(() => alert("Contenido copiado al portapapeles"))
      .catch((err) => console.error("Error al copiar: ", err));
  };

  return (
    <>
      <div className="container-fluid" style={{ height: "100vh" }}>
        <div className="row" style={{ height: "100%" }}>
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2 px-0" style={{ height: "100vh" }}>
            <Sidebar />
          </div>

          {/* Main content */}
          <main className="col-md-9 col-lg-10 px-0 bg-white" style={{ overflowY: "auto", height: "100%" }}>
            <Header />

            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="container">
                {/* Botón para obtener datos */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="fw-bold">Noticias {day}</h3>
                  <button className="btn btn-outline-primary" onClick={handleFetchData}>
                    <FaCloudDownloadAlt />
                  </button>
                </div>

                {/* Barra de búsqueda */}
                <div className="input-group mb-4" style={{ maxWidth: "400px" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ borderRadius: "4px 0 0 4px", boxShadow: "none" }}
                  />
                  <button className="btn btn-primary" type="button" disabled>
                    <FaExternalLinkAlt />
                  </button>
                </div>

                {/* Contenido de las tarjetas */}
                <div className="row">
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <div key={index} className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100" style={{ maxHeight: "300px", position: "relative" }}>
                          {/* Botones flotantes siempre visibles */}
                          <div className="d-flex justify-content-between align-items-center p-2" style={{ position: "absolute", top: "0", left: "0", right: "0", backgroundColor: "rgba(255, 255, 255, 0.9)", zIndex: 1 }}>
                            <button className="btn btn-outline-primary btn-sm" onClick={() => handleCopy(item)}>
                              <FaClipboard />
                            </button>
                            <a href={item.url} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
                              <FaExternalLinkAlt />
                            </a>
                          </div>

                          <div className="card-body" style={{ paddingTop: "50px", overflowY: "auto", maxHeight: "260px" }}>
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">
                              <strong>Fecha desde la URL:</strong> {item.date_from_url}<br />
                              <strong>Fecha desde la página:</strong> {dayjs(item.date_from_page).format("DD/MM/YYYY")}<br />
                              <strong>Descripción:</strong> {item.description}<br />
                            </p>
                            <p className="card-text">{item.content.substring(0, 100)}...</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center" style={{ color: "#5f6368" }}>
                      No se encontraron resultados o no hay datos.
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;