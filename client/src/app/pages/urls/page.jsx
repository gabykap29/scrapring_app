"use client";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState } from "react";
import dayjs from "dayjs";
import { FaSearch, FaClipboard } from "react-icons/fa";

const Urls = () => {
  const day = dayjs(new Date()).format("DD-MM-YYYY");
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    const response = await fetch("http://localhost:4000/api/scrapingOne", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: urls }),
    });
    const data = await response.json();
    setLoading(false);
    setResult(data);
  };

  const filteredData = result.filter((item) => {
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
    navigator.clipboard
      .writeText(content)
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

          {/*  Formulario para cargar urls a la base de datos  */}
          <div
            className="col-md-9 col-lg-10 px-0 bg-white"
            style={{ overflowY: "auto", height: "100%" }}
          >
            <Header />
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="text-center">Buscar por URL</h3>
                  <form>
                    <div className="form-group">
                      <label htmlFor="urls">URLs</label>
                      <div className="alert alert-warning" role="alert">
                        <small>
                          Recuerde que las url deben verse algo asi:
                          "https://talcosa.com"
                        </small>
                      </div>
                      <input type="text" className="form-control" 
                      onChange={(e) => setUrls(e.target.value)}
                      />
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary mt-2">
                      Cargar
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/*  Resultados de la busqueda  */}
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}
              >
                <div
                  className="spinner-border text-primary"
                  style={{ width: "3rem", height: "3rem" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="container">
                <div className="card mt-5 ">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h6 className="fw-bold">Noticias {day}</h6>
                      {/* Búsqueda */}
                      <div
                        className="input-group"
                        style={{ maxWidth: "400px" }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Buscar..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          style={{
                            borderRadius: "4px 0 0 4px",
                            boxShadow: "none",
                          }}
                        />
                        <button
                          className="btn btn-primary"
                          type="button"
                          disabled
                        >
                          <FaSearch />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mt-3">
                  <div className="card-body">
                    <div className="row">
                      {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                          <div key={index} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                              <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">
                                  <strong>Fecha desde la URL:</strong>{" "}
                                  {item.date_from_url}
                                  <br />
                                  <strong>Fecha desde la página:</strong>{" "}
                                  {item.date_from_page}
                                  <br />
                                  <strong>Descripción:</strong>{" "}
                                  {item.description}
                                  <br />
                                </p>
                                <p className="card-text">
                                  {item.content.substring(0, 200)}...
                                </p>
                                <div className="d-flex justify-content-between">
                                  <a
                                    href={item.url}
                                    className="btn btn-primary"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Leer más
                                  </a>
                                  <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => handleCopy(item)}
                                  >
                                    <FaClipboard /> Copiar
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div
                          className="col-12 text-center"
                          style={{ color: "#5f6368" }}
                        >
                          Ingrese una url para buscar noticias...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Urls;
