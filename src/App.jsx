import { useEffect, useState } from 'react';
import { Tab, Tabs, Container, Row, Col, Form, Button } from 'react-bootstrap';

import './App.css';
import defaultVrmPath from './resources/AvatarSampleB.vrm';
import GltfVrmParser from './util/GltfVrmParser';
import GltfJsonEditorTab from './components/gltfJsonEditorTab';

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

  const gltfJsonEditorSubmitCallback = (json) => {
    console.log('JSON CHANGED:', json);
    gltfVrmParser.json = json;
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

  return (
    <div className="App">
      <Container>
        <Row>
          <Col md={6}>
            VIEWER: {gltfVrmParser?.fileName}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload VRM0</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" onClick={handleDownloadButtonClick}>
              Download File
            </Button>
          </Col>
          <Col md={6}>
            <Tabs defaultActiveKey="gltfJsonEditorTab" className="editor-tabs">
              <Tab eventKey="gltfJsonEditorTab" title="GLTF JSON Editor">
                <GltfJsonEditorTab
                  gltfVrmJsonString={JSON.stringify(
                    gltfVrmParser?.json,
                    null,
                    4,
                  )}
                  submitCallback={gltfJsonEditorSubmitCallback}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
