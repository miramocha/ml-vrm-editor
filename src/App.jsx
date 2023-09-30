import { useEffect, useState } from 'react';
import {
  Tab,
  Tabs,
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
  Navbar,
  Offcanvas,
} from 'react-bootstrap';

import './App.css';
import defaultVrmPath from './resources/AvatarSampleB.vrm';
import GltfVrmParser from './utils/GltfVrmParser';
import GltfJsonEditorTab from './components/gltfJsonEditorTab';
import GlobalVrmMToonOutlineSettingsForm from './components/globalVrmMToonOutlineSettingsForm';
import GlobalVrmMToonLightingSettingsForm from './components/globalVrmMToonLightingSettingsForm';

export default function App() {
  const [gltfVrmParser, setGltfVrmParser] = useState(null);
  const [hideOffcanvas, setHideOffcanvas] = useState(false);

  useEffect(() => {
    fetch(defaultVrmPath)
      .then((response) => response.blob())
      .then(async (blob) => {
        const newGltfVrmParser = new GltfVrmParser();
        await newGltfVrmParser.parseFile(new File([blob], 'AvatarSampleB.vrm'));

        console.log('PARSER:', newGltfVrmParser);

        setGltfVrmParser(newGltfVrmParser);
      });
  }, []);

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

  const handleHideOffcanvas = () => setHideOffcanvas(true);

  const handleToggleEditorButtonClick = () => setHideOffcanvas(!hideOffcanvas);

  return (
    <>
      <Navbar
        className="justify-content-between bg-primary"
        data-bs-theme="dark"
      >
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
                  <Button
                    variant="secondary"
                    onClick={handleValidateButtonClick}
                  >
                    <i className="bi bi-check2-circle me-2" />
                    Validate
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleDownloadButtonClick}
                  >
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
      <Offcanvas
        show={!hideOffcanvas}
        placement="end"
        onHide={handleHideOffcanvas}
        scroll={false}
        backdrop={false}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Editor</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Tabs
            defaultActiveKey="globalMToonOutlineSettingsTab"
            variant="underline"
            fill
          >
            <Tab
              eventKey="globalMToonOutlineSettingsTab"
              title="Global MToon Outline Settings"
            >
              <GlobalVrmMToonOutlineSettingsForm
                gltfVrmParser={gltfVrmParser}
              />
            </Tab>
            <Tab
              eventKey="globalMToonLightingSettingsTab"
              title="Global MToon Lighting Settings"
            >
              <GlobalVrmMToonLightingSettingsForm
                gltfVrmParser={gltfVrmParser}
              />
            </Tab>
            <Tab
              eventKey="mToonMaterialsEditorTab"
              title="MToon Material Editor"
            >
              MATERIAL EDITOR
            </Tab>
            <Tab eventKey="gltfJsonEditorTab" title="GLTF JSON Editor">
              <GltfJsonEditorTab gltfVrmParser={gltfVrmParser} />
            </Tab>
          </Tabs>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
