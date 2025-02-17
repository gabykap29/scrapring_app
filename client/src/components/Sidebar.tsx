"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { FaBrain } from "react-icons/fa6";
import { IoIosPersonAdd } from "react-icons/io";
import { GrMenu } from "react-icons/gr";
import { RiMenuFold3Fill } from "react-icons/ri";
import { FaLink } from "react-icons/fa6";
const Sidebar = () => {
  const [currentPath, setCurrentPath] = useState("");
  const [isSidebarVisible, setSidebarVisible] = useState(true); // Estado para mostrar u ocultar el sidebar

  useEffect(() => {
    const path = window.location.pathname;
    setCurrentPath(path || "/");
  }, []);

  // Actualizar visibilidad del sidebar según el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarVisible(true); // Mostrar el sidebar en pantallas grandes
      }
    };

    // Escuchar cambios de tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Configurar estado inicial según el tamaño de la pantalla
    handleResize();

    // Cleanup del event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible); // Alternar visibilidad del sidebar
  };

  const activeLinkStyle = {
    backgroundColor: "#495057",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  };

  const linkStyle = {
    padding: "10px 15px",
    borderRadius: "5px",
    color: "white",
    textDecoration: "none",
    transition: "background-color 0.3s, transform 0.2s",
  };

  const handleMouseEnter = (e: any) => {
    e.currentTarget.style.backgroundColor = "#6c757d";
    e.currentTarget.style.transform = "scale(1.02)";
  };

  const handleMouseLeave = (e: any) => {
    if (currentPath !== e.currentTarget.pathname) {
      e.currentTarget.style.backgroundColor = "";
    }
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <>
      {/* Botón para alternar el sidebar */}
      <button
        onClick={toggleSidebar}
        className="btn btn-secondary d-md-none"
        style={{
          position: "fixed",
          top: "12px",
          left: "0px",
          zIndex: 1000,
        }}
      >
        {isSidebarVisible ? <RiMenuFold3Fill />  :<GrMenu />} 
      </button>

      {/* Sidebar */}
      <div
        className={`d-flex flex-column flex-shrink-0 p-3 text-white ${
          isSidebarVisible ? "sidebar-visible" : "sidebar-hidden"
        }`}
        style={{
          height: "100vh",
          background: "linear-gradient(180deg, #1c1e22, #343a40)",
          borderRight: "2px solid #495057",
          position: "fixed",
          top: 0,
          left: isSidebarVisible ? "0" : "-250px", // Mover el sidebar fuera de la vista
          width: "219px",
          transition: "left 0.3s ease",
          zIndex: 999,
        }}
      >
        <Link
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="icon me-2">
            <FaBrain size={25} />
          </span>
          <span className="fs-3 fw">Extractor de Noticias</span>
        </Link>

        <hr style={{ borderColor: "#495057" }} />

        <ul className="nav flex-column mb-auto">
          <li className="nav-item">
            <Link
              href="/"
              className="nav-link text-white d-flex align-items-center"
              style={{
                ...linkStyle,
                ...(currentPath === "/pages/home" ? activeLinkStyle : {}),
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="icon me-2 d-flex align-items-center">
                <FaHome size={20} />
              </span>
              <span>Inicio</span>
            </Link>
          </li>
          <li className="nav-item" style={{ marginTop: "10px" }}>
            <Link
              href="/pages/urls"
              className="nav-link text-white d-flex align-items-center"
              style={{
                ...linkStyle,
                ...(currentPath === "/pages/persons/upload-records"
                  ? activeLinkStyle
                  : {}),
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="icon me-2 d-flex align-items-center">
                <FaLink size={20} />
              </span>
              <span>Añadir</span>
            </Link>
          </li>
        </ul>
        <hr style={{ borderColor: "#495057" }} />
      </div>
    </>
  );
};

export default Sidebar;