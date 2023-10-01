import { useContext } from 'react';
import { Card, Stack, ListGroup } from 'react-bootstrap';
import { GltfVrmParserContext } from '../AppContext';

export default function TextureBrowser() {
  const gltfVrmParser = useContext(GltfVrmParserContext);

  return (
    <Stack gap={2}>
      {gltfVrmParser?.textureModels.map((textureModel) => (
        <Card key={textureModel.imagesIndex}>
          <Card.Img variant="top" src={textureModel.imageSrc} />
          <Card.Body>
            <Card.Title>{textureModel.name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              Images Index: {textureModel.imagesIndex}
            </ListGroup.Item>
            <ListGroup.Item>
              Buffer Index: {textureModel.bufferViewsIndex}
            </ListGroup.Item>
            <ListGroup.Item>MimeType: {textureModel.mimeType}</ListGroup.Item>
          </ListGroup>
        </Card>
      ))}
    </Stack>
  );
}
