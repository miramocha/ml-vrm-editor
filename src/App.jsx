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
import GlobalVrmOutlineSettingsForm from './components/globalVrmOutlineSettingsForm';

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

  const gltfJsonChangeCallback = (json) => {
    console.log('JSON CHANGED:', json);
    gltfVrmParser.json = json;
  };

  return (
    <Container>
      <h2>File Upload</h2>
      <Row>
        <Col>
          <h3>File Name: {gltfVrmParser?.fileName}</h3>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload VRM0</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
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
          <Tabs
            defaultActiveKey="globalVrmMaterialSettingsTab"
            className="editor-tabs"
          >
            <Tab
              eventKey="globalVrmMaterialSettingsTab"
              title="Global VRM Material Settings"
            >
              <GlobalVrmOutlineSettingsForm
                gltfVrmJsonString={JSON.stringify(gltfVrmParser?.json)}
                submitCallback={gltfJsonChangeCallback}
              />
            </Tab>
            <Tab eventKey="gltfJsonEditorTab" title="GLTF JSON Editor">
              <GltfJsonEditorTab
                gltfVrmJsonString={JSON.stringify(gltfVrmParser?.json)}
                submitCallback={gltfJsonChangeCallback}
              />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}
