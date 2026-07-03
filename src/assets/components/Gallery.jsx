import { Component } from "react";
import { Spinner, Form, Button } from "react-bootstrap";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
      error: null,
      selectedMovie: null,
      showModal: false,
      comments: [],
      newCommentText: "",
      newCommentRate: 1,
    };
  }

  componentDidMount() {
    const ApiFecth = async () => {
      try {
        const r = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=d8135f0f&s=${this.props.saga}`,
        );
        const dati = await r.json();
        if (dati.Response === "True") {
          this.setState({ movies: dati.Search });
        } else {
          this.setState({ error: dati.Error });
        }
      } catch (errore) {
        console.error(`Errore di caricamento: ${errore}`);
      } finally {
        this.setState({ loading: false });
      }
    };
    ApiFecth();
  }

  render() {
    if (this.state.loading) {
      return <Spinner variant="danger" animation="border" />;
    }

    if (this.state.error) {
      return <p>Errore: {this.state.error}</p>;
    }
    const loadComemnt = async (imdbID) => {
      try {
        const r = await fetch(import.meta.env.VITE_COMMENTS_API, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_COMMENTS_TOKEN}`,
          },
        });
        const allComments = await r.json();
        const filtered = allComments.filter((c) => c.elementId === imdbID);
        this.setState({ comments: filtered });
      } catch (error) {
        console.error(`Errore nel caricamento dei commenti: ${error}`);
      }
    };
    const openModal = (movie) => {
      this.setState({
        selectedMovie: movie,
        showModal: true,
      });
      loadComemnt(movie.imdbID);
    };
    return (
      <div className="movie-poster">
        {this.state.movies.map((film) => (
          <img
            key={film.imdbID}
            src={film.Poster}
            alt={film.Title}
            onError={(e) => {
              e.target.style.display = "none";
            }}
            onClick={() => openModal(film)}
          />
        ))}
      </div>
    );
  }
}

export default Gallery;
