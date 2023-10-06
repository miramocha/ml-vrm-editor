/* eslint-disable no-unused-vars */
// TO DO - REMOVE THIS
import { useContext } from 'react';
import {
  Card,
  Form,
  Container,
  Col,
  Row,
  Stack,
  Button,
} from 'react-bootstrap';
import { GltfVrmParserContext } from '../AppContext';

export default function VrmMetadataEditor() {
  const gltfVrmParser = useContext(GltfVrmParserContext);
  // const appController = useContext(AppControllerContext);

  const handleMetadataSaveSubmit = (event) => {
    event.preventDefault();
    console.log('saving..');
  };

  return (
    <Form onSubmit={handleMetadataSaveSubmit}>
      <Stack gap={2}>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={6}>
              <Card.Img
                variant="top"
                src={gltfVrmParser?.thumbnailImagesrc}
                alt="p"
              />
            </Col>
          </Row>
        </Container>

        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            defaultValue={gltfVrmParser?.vrmMetadataModel.title}
            key={gltfVrmParser?.vrmMetadataModel.title}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Version</Form.Label>
          <Form.Control
            name="version"
            defaultValue={gltfVrmParser?.vrmMetadataModel.version}
            key={gltfVrmParser?.vrmMetadataModel.version}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            name="author"
            defaultValue={gltfVrmParser?.vrmMetadataModel.author}
            key={gltfVrmParser?.vrmMetadataModel.author}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Metadata
        </Button>
      </Stack>
    </Form>
  );
}
