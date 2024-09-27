"use client";
import { useEffect, useState, FormEvent } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

// Definimos el tipo para las URLs
interface Url {
  id: number;
  url: string;
}

const URLPage: React.FC = () => {
  const [urls, setUrls] = useState<Url[]>([]);
  const [newUrl, setNewUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Simulación de una petición a una base de datos
  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      setError(null); // Limpiar cualquier error previo
      try {
        const res = await fetch("http://localhost:4000/api/urls", {
          method: "GET",
        });

        if (!res.ok) {
          // Si el status no está entre 200-299, lanzamos un error
          throw new Error(`Error: ${res.status}`);
        }

        const result: Url[] = await res.json();
        setUrls(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Error desconocido");
        } else {
          setError("Error desconocido");
        }
      }
       finally {
        setLoading(false);
      }
    };
    fetchUrls();
  }, []);

  // Manejar el envío del formulario para agregar una nueva URL
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newUrl.trim()) {
      const newEntry: Url = { id: urls.length + 1, url: newUrl };
      setUrls([...urls, newEntry]);
      setNewUrl("");
    }
  };

  // Manejar la eliminación de una URL
  const handleDelete = (id: number) => {
    const updatedUrls = urls.filter((url) => url.id !== id);
    setUrls(updatedUrls);
  };

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1" style={{ overflowY: "auto", height: "100%" }}>
        <Header />
        <div className="container-fluid p-4" style={{ height: "calc(100vh - 70px)" }}>
          <div className="row" style={{ height: "100%" }}>
            {/* Columna de URLs */}
            <div className="col-lg-6 col-md-6 col-sm-12 mb-3 p-4 overflow-auto shadow" style={{ height: "100%" }}>
              <h3 className="fw-bold mb-4">URLs Guardadas</h3>
              {loading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : (
                <div className="row">
                  {urls.map((urlObj) => (
                    <div key={urlObj.id} className="col-md-12 mb-3">
                      <div className="card shadow-sm h-100">
                        <div className="card-body d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="card-title">URL #{urlObj.id}</h6>
                            <p className="card-text">
                              <a href={urlObj.url} target="_blank" rel="noopener noreferrer">
                                {urlObj.url}
                              </a>
                            </p>
                          </div>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(urlObj.id)}>
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Columna de Formulario */}
            <div className="col-lg-6 col-md-6 col-sm-12 mb-3 p-4 bg-light shadow" style={{ height: "100%" }}>
              <h3 className="fw-bold mb-4">Agregar nueva URL</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="url" className="form-label">
                    URL
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="url"
                    name="url"
                    placeholder="https://example.com"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  <FaPlus /> Agregar URL
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLPage;
