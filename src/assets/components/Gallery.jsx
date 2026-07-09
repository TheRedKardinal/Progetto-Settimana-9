import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import CommentsModal from "./CommentsModal";

function Gallery({ saga, type }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [newCommentRate, setNewCommentRate] = useState(1);
  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = 6;

  useEffect(() => {
    const ApiFecth = async () => {
      try {
        const r = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${import.meta.env.VITE_OMDB_API_KEY}&type=${type}&s=${saga}`,
        );
        const dati = await r.json();
        if (dati.Response === "True") {
          setMovies(dati.Search);
        } else {
          setError(dati.Error);
        }
      } catch (errore) {
        console.error(`Errore di caricamento: ${errore}`);
      } finally {
        setLoading(false);
      }
    };
    ApiFecth();
  }, [saga]);

  if (loading) {
    return <Spinner variant="danger" animation="border" />;
  }

  if (error) {
    return <p>Errore: {error}</p>;
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
      setComments(filtered);
    } catch (error) {
      console.error(`Errore nel caricamento dei commenti: ${error}`);
    }
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
    loadComment(movie.imdbID);
  };

  const deleteModal = () => {
    setShowModal(false);
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
          comment: newCommentText,
          rate: newCommentRate,
          elementId: selectedMovie.imdbID,
        }),
      });
      loadComment(selectedMovie.imdbID);
      setNewCommentText("");
      setNewCommentRate(1);
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
      loadComment(selectedMovie.imdbID);
    } catch (error) {
      console.error(`Errore nell'eliminazione del commento: ${error}`);
    }
  };

  const newtext = (e) => {
    setNewCommentText(e.target.value);
  };

  const newRating = (e) => {
    setNewCommentRate(e.target.value);
  };

  const prevSlide = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setStartIndex((prev) => Math.min(movies.length - visibleCount, prev + 1));
  };

  const visibleMovies = movies.slice(startIndex, startIndex + visibleCount);

  return (
    <>
      <div className="movie-carousel">
        <button onClick={prevSlide} disabled={startIndex === 0}>
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
          disabled={startIndex + visibleCount >= movies.length}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
      <CommentsModal
        show={showModal}
        movie={selectedMovie}
        comments={comments}
        newCommentText={newCommentText}
        newCommentRate={newCommentRate}
        onClose={deleteModal}
        onTextChange={newtext}
        onRateChange={newRating}
        onSubmit={submitComment}
        onDelete={deleteComment}
      />
    </>
  );
}

export default Gallery;
