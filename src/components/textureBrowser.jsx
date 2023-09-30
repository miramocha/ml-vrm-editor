import PropTypes from 'prop-types';
import { Card, Stack, ListGroup } from 'react-bootstrap';
import GltfVrmParser from '../utils/GltfVrmParser';

export default function TextureBrowser({ gltfVrmParser }) {
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

TextureBrowser.propTypes = {
  gltfVrmParser: PropTypes.instanceOf(GltfVrmParser),
};
TextureBrowser.defaultProps = {
  gltfVrmParser: null,
};
