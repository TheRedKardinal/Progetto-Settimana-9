import NavbarComp from "./assets/components/NavbarComp";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import SectionToRender from "./assets/components/SectionSelected";

function App() {
  return (
    <>
      <header>
        <NavbarComp />
      </header>
      <main>
        <SectionToRender />
      </main>
    </>
  );
}

export default App;
