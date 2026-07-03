import NavbarComp from "./assets/components/NavbarComp";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import SectionToRender from "./assets/components/SectionSelected";
import Gallery from "./assets/components/Gallery";
import Footer from "./assets/components/Footer";

function App() {
  return (
    <>
      <header>
        <NavbarComp />
      </header>
      <main>
        <SectionToRender />
        <h2>Pirati dei Caraibi</h2>
        <Gallery saga="Pirates of the Caribbean" />
        <h2>Harry Potter</h2>
        <Gallery saga="Harry Potter" />
        <h2>Deadpool</h2>
        <Gallery saga="Deadpool" />
      </main>
      <Footer />
    </>
  );
}

export default App;
