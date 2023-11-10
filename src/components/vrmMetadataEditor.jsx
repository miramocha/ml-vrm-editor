import { useContext } from 'react';
import { Trans } from 'react-i18next';
import { Form, Container, Col, Row, Stack, Button } from 'react-bootstrap';
import { GltfVrmParserContext, AppControllerContext } from '../AppContext';
import ReplaceTextureButton from './replaceTextureButton';

export default function VrmMetadataEditor() {
  const gltfVrmParser = useContext(GltfVrmParserContext);
  const appController = useContext(AppControllerContext);

  const handleMetadataSaveSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const vrmMetadataModel = gltfVrmParser.getVrmMetadataModel();
    vrmMetadataModel.processFormData(formData);

    gltfVrmParser.commitJsonChanges();
    appController.loadVrm(await gltfVrmParser.buildFile());
  };

  return (
    <Form onSubmit={handleMetadataSaveSubmit}>
      <Stack gap={2}>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={6}>
              <ReplaceTextureButton
                textureModel={gltfVrmParser?.thumbnailImageTextureModel}
              />
            </Col>
          </Row>
        </Container>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            defaultValue={gltfVrmParser?.vrmMetadataModel.metadataJson.title}
            key={gltfVrmParser?.vrmMetadataModel.metadataJson.title}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Version</Form.Label>
          <Form.Control
            name="version"
            defaultValue={gltfVrmParser?.vrmMetadataModel.metadataJson.version}
            key={gltfVrmParser?.vrmMetadataModel.metadataJson.version}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            name="author"
            defaultValue={gltfVrmParser?.vrmMetadataModel.metadataJson.author}
            key={gltfVrmParser?.vrmMetadataModel.metadataJson.author}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contact Information</Form.Label>
          <Form.Control
            name="contactInformation"
            defaultValue={
              gltfVrmParser?.vrmMetadataModel.metadataJson.contactInformation
            }
            key={
              gltfVrmParser?.vrmMetadataModel.metadataJson.contactInformation
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Reference</Form.Label>
          <Form.Control
            name="reference"
            defaultValue={
              gltfVrmParser?.vrmMetadataModel.metadataJson.reference
            }
            key={gltfVrmParser?.vrmMetadataModel.metadataJson.reference}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          <Trans i18nKey="save">Save</Trans>
        </Button>
      </Stack>
    </Form>
  );
}
