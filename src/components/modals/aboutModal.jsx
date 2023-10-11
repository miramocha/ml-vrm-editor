import PropTypes from 'prop-types';
import { Modal, Stack, Button, Container, Col, Row } from 'react-bootstrap';
import aboutImagePath from '../../resources/about.png';

export default function AboutModal({ showAboutModal, setShowAboutModal }) {
  const handleAboutModalHide = () => {
    setShowAboutModal(false);
  };

  console.log(aboutImagePath);

  return (
    <Modal
      show={showAboutModal}
      onHide={setShowAboutModal}
      size="lg"
      style={{
        backgroundImage: `url(${aboutImagePath})`,
        backgroundSize: 'auto 100vh',
        backgroundRepeat: 'no-repeat',
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>About</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="mb-2">
            <Col>
              <p>
                ML VRM Editor is a web app that allows you to edit your VRM
                right in your web browser.
              </p>
              <p>
                All file processing and building during editing is done locally.
                There is no data send over to any server unless during
                upload/download with VRoid Hub Api Integration (future state).
              </p>
              <p>
                Feel free to create an issue in Github repository for feature
                suggestion, bug report, and other feedbacks.{' '}
                <b>Happy Editing!</b>
              </p>
              <i>- Mira</i>
            </Col>
          </Row>
          <Row>
            <Col className="d-grid">
              <h3>Twitter</h3>
              <Button
                size="lg"
                variant="outline-light"
                href="http://twitter.miraluna.moe"
                target="_blank"
              >
                <i className="bi bi-twitter h1" />
              </Button>
            </Col>
            <Col className="d-grid">
              <h3>Twitch</h3>
              <Button
                size="lg"
                variant="outline-light"
                href="http://twitch.miraluna.moe"
                target="_blank"
              >
                <i className="bi bi-twitch h1" />
              </Button>
            </Col>
            <Col className="d-grid">
              <h3>Github</h3>
              <Button
                size="lg"
                variant="outline-light"
                href="http://vrmeditorfeedback.miraluna.moe"
                target="_blank"
              >
                <i className="bi bi-github h1" />
              </Button>
            </Col>
            <Col className="d-grid">
              <h3>Discord</h3>
              <Button
                size="lg"
                variant="outline-light"
                href="http://discord.miraluna.moe"
                target="_blank"
              >
                <i className="bi bi-discord h1" />
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Stack>
          <Button variant="danger" onClick={handleAboutModalHide}>
            Close
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}

AboutModal.propTypes = {
  showAboutModal: PropTypes.bool,
  setShowAboutModal: PropTypes.func,
};
AboutModal.defaultProps = {
  showAboutModal: false,
  setShowAboutModal: () => {},
};
