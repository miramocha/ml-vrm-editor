import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Navbar, Container } from 'react-bootstrap';
import { GltfVrmParserContext } from '../AppContext';

export default function TopNavigation({
  setHideRightOffcanvas,
  setShowOpenVrmModal,
}) {
  const gltfVrmParser = useContext(GltfVrmParserContext);

  const handleToggleRightOffCanvasButtonClick = () =>
    setHideRightOffcanvas(false);

  const handleSaveButtonClick = async () => {
    const blobURL = window.URL.createObjectURL(await gltfVrmParser.getFile());
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', gltfVrmParser.fileName);
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  const handleLoadButtonClick = () => setShowOpenVrmModal(true);

  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <i className="bi bi-brush me-2 text-light" />
          ML VRM Editor
        </Navbar.Brand>
        <Navbar.Collapse>
          <Button
            className="me-2"
            variant="outline-light"
            onClick={handleLoadButtonClick}
          >
            <i className="bi bi-folder2-open me-2" />
            Load
          </Button>
          <Button variant="outline-light" onClick={handleSaveButtonClick}>
            <i className="bi bi-save me-2" />
            Save
          </Button>
        </Navbar.Collapse>
      </Container>
      <Button
        className="me-2"
        variant="outline-light"
        onClick={handleToggleRightOffCanvasButtonClick}
      >
        <i className="bi bi-arrow-bar-left me-2" />
        Editor
      </Button>
    </Navbar>
  );
}

TopNavigation.propTypes = {
  setHideRightOffcanvas: PropTypes.func,
  setShowOpenVrmModal: PropTypes.func,
};
TopNavigation.defaultProps = {
  setHideRightOffcanvas: () => {},
  setShowOpenVrmModal: () => {},
};
