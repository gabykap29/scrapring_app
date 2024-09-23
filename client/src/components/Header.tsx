import Link from "next/link";

const Header = () => {
  return (
    <div
      className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom text-white"
      style={{
        background: "linear-gradient(90deg, #343a40, #495057)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Título o Logo */}
      <h3 className="h4 m-0">Panel de Control</h3>

      {/* Botones de navegación */}
      <div className="btn-toolbar mb-2 mb-md-0">
        <div className="btn-group me-3">
          <Link href={'/pages/home'}>
            <button type="button" className="btn btn-sm btn-outline-light" style={{ marginRight: "10px" }}>
              Obtener Noticias
            </button>
          </Link>
          <Link href={'/pages/repairs'}>
            <button type="button" className="btn btn-sm btn-outline-light" style={{ marginRight: "10px" }}>
              Urls
            </button>
            </Link>
        </div>

      </div>
    </div>
  );
};

export default Header;
