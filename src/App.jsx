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
} from 'react-bootstrap';

import './App.css';
import defaultVrmPath from './resources/AvatarSampleB.vrm';
import GltfVrmParser from './utils/GltfVrmParser';
import GltfJsonEditorTab from './components/gltfJsonEditorTab';
import GlobalVrmMToonOutlineSettingsForm from './components/globalVrmMToonOutlineSettingsForm';
import GlobalVrmMToonLightingSettingsForm from './components/globalVrmMToonLightingSettingsForm';

export default function App() {
  const [gltfVrmParser, setGltfVrmParser] = useState(null);

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

  return (
    <Container>
      <h2>File Upload</h2>
      <Row>
        <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" onChange={handleFileChange} />
            <Form.Text>Only UniVRM (VRM0) is supported currently.</Form.Text>
          </Form.Group>
          <ButtonGroup>
            <Button variant="primary" onClick={handleValidateButtonClick}>
              Validate GLTF
            </Button>
            <Button variant="primary" onClick={handleDownloadButtonClick}>
              Download File
            </Button>
          </ButtonGroup>
        </Col>
        <Col>
          <Tabs defaultActiveKey="globalMToonOutlineSettingsTab">
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
            <Tab eventKey="gltfJsonEditorTab" title="GLTF JSON Editor">
              <GltfJsonEditorTab gltfVrmParser={gltfVrmParser} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}
