import { Form, Button, Container } from "react-bootstrap";
// Teoricamente qui servirebbe un prop che renderizzi la pagina per creare una SPA, ma nel compito è tutto statico quindi utilizzero componenti "finti"
function SectionToRender() {
  return (
    <>
      <section className="section-selected">
        <Container fluid>
          <div>
            <h2 className="text-white">TV Shows</h2>
            <Form.Select aria-label="Selettore Categorie">
              <option>Genres</option>
              <option value="fantasy">Fantasy</option>
              <option value="thriller">Thriller</option>
              <option value="commedia">Commedia</option>
            </Form.Select>
          </div>
          <div>
            <Button>
              <i className="bi bi-grid-fill"></i>
            </Button>
            <Button>
              <i className="bi bi-grid-3x3-gap-fill"></i>
            </Button>
          </div>
        </Container>
      </section>
      ;
    </>
  );
}

export default SectionToRender;
