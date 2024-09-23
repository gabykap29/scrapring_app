import Link from "next/link";
const Sidebar = () => {

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white"
      style={{
        height: "100vh",
        background: "linear-gradient(180deg, #212529, #343a40)",
        borderRight: "2px solid #495057",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg
          className="bi pe-none me-2"
          width="40"
          height="32"
          fill="currentColor"
        >
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span className="fs-4 fw-bold">Scraping News</span>
      </Link>

      <hr style={{ borderColor: "#495057" }} />

      {/* Nav Links */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            href="/pages/home"
            className="nav-link active text-white"
            aria-current="page"
            style={{ backgroundColor: "#495057" }}
          >
            <svg
              className="bi pe-none me-2"
              width="20"
              height="20"
              fill="currentColor"
            >
              <use xlinkHref="#home"></use>
            </svg>
            Obtener Noticias
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/pages/repairs" className="nav-link text-white">
            <svg
              className="bi pe-none me-2"
              width="20"
              height="20"
              fill="currentColor"
            >
              <use xlinkHref="#speedometer2"></use>
            </svg>
            Urls
          </Link>
        </li>

      </ul>

      <hr style={{ borderColor: "#495057" }} />

      {/* Admin Section */}
      <div className="dropdown">
        <Link
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <strong>Admin</strong>
        </Link>
        <ul
          className="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <Link className="dropdown-item" href="#">
              New project...
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="#">
              Settings
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="#">
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" href="#">
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;