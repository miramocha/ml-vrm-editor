import { useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { GltfVrmParserContext } from '../AppContext';

export default function TextureBrowser() {
  const gltfVrmParser = useContext(GltfVrmParserContext);

  return (
    <Container>
      <Row>
        {gltfVrmParser?.textureModels.map((textureModel) => (
          <Col key={textureModel.imagesIndex} xs={6} md={4}>
            {/* <Image src={textureModel.imageSrc} thumbnail /> */}
            <Card className="mb-2">
              <Card.Img variant="top" src={textureModel.imageSrc} />
              <Card.Header>{textureModel.name}</Card.Header>
              {/* <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  Images Index: {textureModel.imagesIndex}
                </ListGroup.Item>
                <ListGroup.Item>
                  Buffer Index: {textureModel.bufferViewsIndex}
                </ListGroup.Item>
                <ListGroup.Item>
                  MimeType: {textureModel.mimeType}
                </ListGroup.Item>
              </ListGroup> */}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
