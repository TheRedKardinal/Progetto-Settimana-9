import { Modal, Form, Button, ListGroup } from "react-bootstrap";

function CommentsModal({
  show,
  movie,
  comments,
  newCommentText,
  newCommentRate,
  onClose,
  onTextChange,
  onRateChange,
  onSubmit,
  onDelete,
}) {
  if (!movie) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{movie.Title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ListGroup className="mb-3">
          {comments.map((c) => (
            <ListGroup.Item
              key={c._id}
              className="d-flex justify-content-between align-items-start"
            >
              <div>
                <strong>{c.rate}/5</strong> - {c.comment}
                <div>
                  <small>{c.author?.split("@")[0]}</small>
                </div>
              </div>
              <Button size="sm" variant="danger" onClick={() => onDelete(c._id)}>
                Elimina
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Voto</Form.Label>
            <Form.Select value={newCommentRate} onChange={onRateChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Commento</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newCommentText}
              onChange={onTextChange}
            />
          </Form.Group>

          <Button type="submit">Invia commento</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CommentsModal;
