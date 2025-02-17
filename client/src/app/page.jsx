"use client";
import { useEffect, useState } from "react";
import { FaSearch, FaClipboard } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import dayjs from 'dayjs';


const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const day = dayjs(new Date()).format('DD-MM-YYYY');
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/news", { cache: 'no-store' });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar los datos según el término de búsqueda
  const filteredData = data.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.date_from_url.includes(searchLower) || 
      item.date_from_page.includes(searchLower)
    );
  });

  // Función para copiar contenido
  const handleCopy = (item) => {
    const content = `Título: ${item.title}\nFecha desde la URL: ${item.date_from_url}\nFecha desde la página: ${item.date_from_page}\nDescripción: ${item.description}\nContenido: ${item.content}`;
    navigator.clipboard.writeText(content)
      .then(() => alert("Contenido copiado al portapapeles"))
      .catch(err => console.error("Error al copiar: ", err));
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
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="fw-bold">Noticias {day}</h3>
                  {/* Búsqueda */}
                  <div className="input-group" style={{ maxWidth: "400px" }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ borderRadius: "4px 0 0 4px", boxShadow: "none" }}
                    />
                    <button className="btn btn-primary" type="button" disabled>
                      <FaSearch />
                    </button>
                  </div>
                </div>

                <div className="row">
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <div key={index} className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                          <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">
                              <strong>Fecha desde la URL:</strong> {item.date_from_url}<br />
                              <strong>Fecha desde la página:</strong> {item.date_from_page}<br />
                              <strong>Descripción:</strong> {item.description}<br />
                            </p>
                            <p className="card-text">{item.content.substring(0, 200)}...</p>
                            <div className="d-flex justify-content-between">
                              <a href={item.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                Leer más
                              </a>
                              <button className="btn btn-outline-secondary" onClick={() => handleCopy(item)}>
                                <FaClipboard /> Copiar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center" style={{ color: "#5f6368" }}>
                      No se encontraron resultados.
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
