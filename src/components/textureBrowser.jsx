import { useContext } from 'react';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import { GltfVrmParserContext, AppControllerContext } from '../AppContext';
import EditableTexture from './editableTexture';

export default function TextureBrowser() {
  const gltfVrmParser = useContext(GltfVrmParserContext);
  const appController = useContext(AppControllerContext);

  const handleAddTextureButtonClick = () => {
    appController.openAddTextureModal();
  };

  return (
    <Container>
      <Row>
        <Col xs={6} md={6} className="d-grid">
          <Button
            size="lg"
            style={{ aspectRatio: '1/1' }}
            onClick={handleAddTextureButtonClick}
          >
            <Stack>
              <i className="bi bi-plus-circle-fill h2" /> Add Texture
            </Stack>
          </Button>
        </Col>
        {gltfVrmParser?.textureModels.map((textureModel) => (
          <Col
            key={`${textureModel?.bufferViewIndex}-${Math.random()}`}
            xs={6}
            md={6}
          >
            <EditableTexture textureModel={textureModel} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
