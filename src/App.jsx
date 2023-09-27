import { useEffect, useState } from 'react';
import { Tab, Tabs, Container, Row, Col, Form } from 'react-bootstrap';

import './App.css';
import defaultVrmPath from './resources/TestVrm0.vrm';
import GltfVrmParser from './util/GltfVrmParser';
import GltfJsonEditorTab from './components/gltfJsonEditorTab';

export default function App() {
  const [gltfVrmParser, setGltfVrmParser] = useState(null);

  useEffect(() => {
    fetch(defaultVrmPath)
      .then((response) => response.blob())
      .then(async (blob) => {
        const newGltfVrmParser = new GltfVrmParser();
        await newGltfVrmParser.parseFile(new File([blob], 'TestVrm0'));

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
          </Col>
          <Col md={6}>
            <Tabs defaultActiveKey="gltfJsonEditorTab" className="editor-tabs">
              <Tab eventKey="gltfJsonEditorTab" title="GLTF JSON Editor">
                <GltfJsonEditorTab
                  gltfVrmJsonString={JSON.stringify(gltfVrmParser?.json)}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
