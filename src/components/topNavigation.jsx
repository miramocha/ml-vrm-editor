import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Navbar } from 'react-bootstrap';
import GltfVrmParser from '../utils/GltfVrmParser';
import { GltfVrmParserContext, AppControllerContext } from '../AppContext';

export default function TopNavigation({
  setGltfVrmParser,
  toggleHideRightOffcanvas,
  toggleHideLeftOffcanvas,
}) {
  const gltfVrmParser = useContext(GltfVrmParserContext);
  const appController = useContext(AppControllerContext);

  const handleFileChange = async (event) => {
    appController.isLoading = true;
    const newGltfVrmParser = new GltfVrmParser();
    await newGltfVrmParser.parseFile(event.target.files[0]);

    setGltfVrmParser(newGltfVrmParser);
    appController.loadVrm(await newGltfVrmParser.buildFile());
    appController.refreshGroup({ group: 'input' });
    appController.isLoading = false;
  };

  const handleDownloadButtonClick = async () => {
    const blobURL = window.URL.createObjectURL(await gltfVrmParser.getFile());
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', gltfVrmParser.fileName);
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  const handleToggleRightOffCanvasButtonClick = () =>
    toggleHideRightOffcanvas();

  const handleToggleLeftOffCanvasButtonClick = () => toggleHideLeftOffcanvas();

  return (
    <Navbar className="justify-content-between bg-primary" data-bs-theme="dark">
      <Button
        className="ms-2"
        variant="outline-light"
        onClick={handleToggleLeftOffCanvasButtonClick}
      >
        <i className="bi bi-arrow-bar-right ms-2" /> Settings and Integration
      </Button>
      <Container>
        <Navbar.Brand>
          <i className="bi bi-brush me-2 text-light" />
          ML VRM Editor
        </Navbar.Brand>
        <Navbar.Text>Upload UniVRM (VRM0)</Navbar.Text>
        <Form>
          <Row>
            <Col>
              <Form.Control
                type="file"
                accept=".vrm"
                onChange={handleFileChange}
              />
            </Col>
            <Col xs="auto">
              <Button variant="secondary" onClick={handleDownloadButtonClick}>
                <i className="bi bi-download me-2" />
                Download
              </Button>
            </Col>
          </Row>
        </Form>
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
  setGltfVrmParser: PropTypes.func,
  toggleHideRightOffcanvas: PropTypes.func,
  toggleHideLeftOffcanvas: PropTypes.func,
};
TopNavigation.defaultProps = {
  setGltfVrmParser: () => {},
  toggleHideRightOffcanvas: () => {},
  toggleHideLeftOffcanvas: () => {},
};
