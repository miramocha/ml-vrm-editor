import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css';
import defaultVrmPath from './resources/TestVrm0.vrm';
import GltfVrmParser from './util/GltfVrmParser';

export default function App() {
  const [vrmParser, setVrmParser] = useState(null);

  useEffect(() => {
    fetch(defaultVrmPath)
      .then((response) => response.blob())
      .then((blob) =>
        setVrmParser(new GltfVrmParser(new File([blob], 'TestVrm0'))),
      );
  }, []);

  return (
    <div className="App">
      <Container>
        <Row>
          <Col md={6}>VIEWER</Col>
          <Col md={6}>
            <Tabs
              defaultActiveKey="materialProperties"
              className="material-tab"
            >
              <Tab eventKey="materialProperties" title="Material Properties">
                {JSON.stringify(vrmParser?.json)}
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
