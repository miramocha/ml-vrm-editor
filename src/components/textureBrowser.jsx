import { useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { GltfVrmParserContext } from '../AppContext';

export default function TextureBrowser() {
  const gltfVrmParser = useContext(GltfVrmParserContext);

  return (
    <Container>
      <Row>
        {gltfVrmParser?.textureModels.map((textureModel, textureIndex) => (
          <Col key={textureModel} xs={6} md={4}>
            <Card className="mb-2">
              <Card.Img variant="top" src={textureModel.imageSrc} />
              <Card.Header>{textureModel.name}</Card.Header>
              <Card.Body>Index: {textureIndex}</Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
