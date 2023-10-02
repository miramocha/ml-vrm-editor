import { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  // ButtonGroup,
  Navbar,
} from 'react-bootstrap';
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
    const newGltfVrmParser = new GltfVrmParser();
    await newGltfVrmParser.parseFile(event.target.files[0]);

    console.log('PARSER:', newGltfVrmParser);

    setGltfVrmParser(newGltfVrmParser);
    appController.loadVrm(await newGltfVrmParser.buildFile());
    appController.refreshGroup({ group: 'input' });
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

  // const handleReloadButtonClick = async () => {
  //   appController.loadVrm(await gltfVrmParser.buildFile());
  // };

  const handleToggleEditorButtonClick = () => toggleHideRightOffcanvas();

  const handleToggleTextureBrowserButtonClick = () => toggleHideLeftOffcanvas();

  return (
    <Navbar className="justify-content-between bg-primary" data-bs-theme="dark">
      <Button
        className="ms-2"
        variant="outline-light"
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
              <Form.Control
                type="file"
                accept=".vrm"
                onChange={handleFileChange}
              />
            </Col>
            <Col xs="auto">
              {/* <ButtonGroup> */}
              {/* <Button variant="secondary" onClick={handleReloadButtonClick}>
                  <i className="bi bi-arrow-clockwise me-2" />
                  Build and Reload View
                </Button> */}
              <Button variant="secondary" onClick={handleDownloadButtonClick}>
                <i className="bi bi-download me-2" />
                Download
              </Button>
              {/* </ButtonGroup> */}
            </Col>
          </Row>
        </Form>
      </Container>
      <Button
        className="me-2"
        variant="outline-light"
        onClick={handleToggleEditorButtonClick}
      >
        <i className="bi bi-arrow-bar-left me-2" />
        Toggle Editor
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
