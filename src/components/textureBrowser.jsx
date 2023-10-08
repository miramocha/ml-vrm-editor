import { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GltfVrmParserContext } from '../AppContext';
import EditableTexture from './editableTexture';

export default function TextureBrowser() {
  const gltfVrmParser = useContext(GltfVrmParserContext);

  return (
    <Container>
      <Row>
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
