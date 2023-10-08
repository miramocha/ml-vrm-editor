import { useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { GltfVrmParserContext } from '../AppContext';
import EditableTexture from './editableTexture';

export default function TextureBrowser() {
  const gltfVrmParser = useContext(GltfVrmParserContext);

  return (
    <Container>
      <Row>
        {gltfVrmParser?.textureModels.map((textureModel, textureIndex) => (
          <Col
            key={`${textureModel?.bufferViewIndex}-${Math.random()}`}
            xs={6}
            md={4}
          >
            <Card className="mb-2">
              <EditableTexture textureModel={textureModel} />
              <Card.Header>{textureModel.name}</Card.Header>
              <Card.Body>Index: {textureIndex}</Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
