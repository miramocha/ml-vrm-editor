import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
  Navbar,
} from 'react-bootstrap';
import GltfVrmParser from '../utils/GltfVrmParser';

export default function TopNavigation({
  gltfVrmParser,
  setGltfVrmParser,
  toggleHideOffcanvasEditor,
  toggleHideOffcanvasTextureBrowser,
}) {
  const handleFileChange = async (event) => {
    const newGltfVrmParser = new GltfVrmParser();
    await newGltfVrmParser.parseFile(event.target.files[0]);

    console.log('PARSER:', newGltfVrmParser);

    setGltfVrmParser(newGltfVrmParser);
  };

  const handleDownloadButtonClick = async () => {
    const blobURL = window.URL.createObjectURL(await gltfVrmParser.buildFile());
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', gltfVrmParser.fileName);
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  const handleValidateButtonClick = () => {
    gltfVrmParser.buildFile();
  };

  const handleToggleEditorButtonClick = () => toggleHideOffcanvasEditor();

  const handleToggleTextureBrowserButtonClick = () =>
    toggleHideOffcanvasTextureBrowser();

  return (
    <Navbar className="justify-content-between bg-primary" data-bs-theme="dark">
      <Button
        className="ms-2"
        variant="outline-primary"
        onClick={handleToggleTextureBrowserButtonClick}
      >
        Toggle Texture Browser
        <i className="bi bi-arrow-bar-right ms-2" />
      </Button>
      <Container>
        <Navbar.Brand>
          <i className="bi bi-brush me-2 text-light" />
          ML VRM Material Editor
        </Navbar.Brand>
        <Navbar.Text>Upload UniVRM (VRM0)</Navbar.Text>
        <Form>
          <Row>
            <Col>
              <Form.Control type="file" onChange={handleFileChange} />
            </Col>
            <Col xs="auto">
              <ButtonGroup>
                <Button variant="secondary" onClick={handleValidateButtonClick}>
                  <i className="bi bi-check2-circle me-2" />
                  Validate
                </Button>
                <Button variant="secondary" onClick={handleDownloadButtonClick}>
                  <i className="bi bi-download me-2" />
                  Build and Download
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Form>
      </Container>
      <Button
        className="me-2"
        variant="outline-primary"
        onClick={handleToggleEditorButtonClick}
      >
        <i className="bi bi-arrow-bar-left me-2" />
        Toggle Editor
      </Button>
    </Navbar>
  );
}

TopNavigation.propTypes = {
  gltfVrmParser: PropTypes.instanceOf(GltfVrmParser),
  setGltfVrmParser: PropTypes.func,
  toggleHideOffcanvasEditor: PropTypes.func,
  toggleHideOffcanvasTextureBrowser: PropTypes.func,
};
TopNavigation.defaultProps = {
  gltfVrmParser: null,
  setGltfVrmParser: () => {},
  toggleHideOffcanvasEditor: () => {},
  toggleHideOffcanvasTextureBrowser: () => {},
};
