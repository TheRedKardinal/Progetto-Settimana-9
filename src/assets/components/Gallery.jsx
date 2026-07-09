import { Component } from "react";
import { Spinner, Form, Button } from "react-bootstrap";
import CommentsModal from "./CommentsModal";

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
      startIndex: 0,
    };
  }

  visibleCount = 6;

  componentDidMount() {
    const ApiFecth = async () => {
      try {
        const r = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${this.props.saga}`,
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
    const loadComment = async (imdbID) => {
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
      loadComment(movie.imdbID);
    };
    const deleteModal = () => {
      this.setState({
        showModal: false,
      });
    };
    const submitComment = async (e) => {
      e.preventDefault();
      try {
        await fetch(import.meta.env.VITE_COMMENTS_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_COMMENTS_TOKEN}`,
          },
          body: JSON.stringify({
            comment: this.state.newCommentText,
            rate: this.state.newCommentRate,
            elementId: this.state.selectedMovie.imdbID,
          }),
        });
        loadComment(this.state.selectedMovie.imdbID);
        this.setState({ newCommentText: "", newCommentRate: 1 });
      } catch (error) {
        console.error(`Errore di pubblicazione del commento: ${error}`);
      }
    };
    const deleteComment = async (id) => {
      try {
        await fetch(`${import.meta.env.VITE_COMMENTS_API}/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_COMMENTS_TOKEN}`,
          },
        });
        loadComment(this.state.selectedMovie.imdbID);
      } catch (error) {
        console.error(`Errore nell'eliminazione del commento: ${error}`);
      }
    };
    const newtext = (e) => {
      this.setState({
        newCommentText: e.target.value,
      });
    };
    const newRating = (e) => {
      this.setState({
        newCommentRate: e.target.value,
      });
    };
    const prevSlide = () => {
      this.setState((state) => ({
        startIndex: Math.max(0, state.startIndex - 1),
      }));
    };
    const nextSlide = () => {
      this.setState((state) => ({
        startIndex: Math.min(state.movies.length - 6, state.startIndex + 1),
      }));
    };
    const visibleMovies = this.state.movies.slice(
      this.state.startIndex,
      this.state.startIndex + 6,
    );
    return (
      <>
        <div className="movie-carousel">
          <button onClick={prevSlide} disabled={this.state.startIndex === 0}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <div className="movie-poster">
            {visibleMovies.map((film) => (
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
          <button
            onClick={nextSlide}
            disabled={this.state.startIndex + 5 >= this.state.movies.length}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
        <CommentsModal
          show={this.state.showModal}
          movie={this.state.selectedMovie}
          comments={this.state.comments}
          newCommentText={this.state.newCommentText}
          newCommentRate={this.state.newCommentRate}
          onClose={deleteModal}
          onTextChange={newtext}
          onRateChange={newRating}
          onSubmit={submitComment}
          onDelete={deleteComment}
        />
      </>
    );
  }
}

export default Gallery;
