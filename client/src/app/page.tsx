import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const Home = () => {


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

          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
