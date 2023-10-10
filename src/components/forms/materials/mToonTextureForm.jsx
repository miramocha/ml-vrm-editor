import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Stack, Container, Row, Col } from 'react-bootstrap';
import EditableTexture from '../../editableTexture';
import MaterialModel from '../../../models/MaterialModel';
import { GltfVrmParserContext } from '../../../AppContext';

export default function MToonTextureForm({ materialModel }) {
  const gltfVrmParser = useContext(GltfVrmParserContext);

  return (
    <Stack gap={2} className="mx-auto">
      {/* <Card className="mb-2">
        <Card.Header>Texture Indices</Card.Header>
        <Card.Body>
          {JSON.stringify(
            materialModel.vrmMaterialJson.textureProperties,
            null,
            '\t',
          )}
        </Card.Body>
      </Card> */}
      <Container>
        <Row>
          {Number.isInteger(materialModel.mainTextureIndex) ? (
            <Col xs={6} md={6}>
              <h5>Main</h5>
              <EditableTexture
                key={materialModel?.mainTextureIndex}
                textureModel={gltfVrmParser?.getTextureModelFromIndex(
                  materialModel.mainTextureIndex,
                )}
              />
            </Col>
          ) : (
            ''
          )}
          {Number.isInteger(materialModel.shadeTextureIndex) ? (
            <Col xs={6} md={6}>
              <h5>Shading</h5>
              <EditableTexture
                key={materialModel?.shadingTextureIndex}
                textureModel={gltfVrmParser?.getTextureModelFromIndex(
                  materialModel.shadeTextureIndex,
                )}
              />
            </Col>
          ) : (
            ''
          )}
          {Number.isInteger(materialModel.normalTextureIndex) ? (
            <Col xs={6} md={6}>
              <h5>Normal</h5>
              <EditableTexture
                textureModel={gltfVrmParser?.getTextureModelFromIndex(
                  materialModel.normalTextureIndex,
                )}
              />
            </Col>
          ) : (
            ''
          )}
          {Number.isInteger(materialModel.emissiveTextureIndex) ? (
            <Col xs={6} md={6}>
              <h5>Emission</h5>
              <EditableTexture
                textureModel={gltfVrmParser?.getTextureModelFromIndex(
                  materialModel.emissiveTextureIndex,
                )}
              />
            </Col>
          ) : (
            ''
          )}
          {Number.isInteger(materialModel.sphereAdditionIndex) ? (
            <Col xs={6} md={6}>
              <h5>Sphere</h5>
              <EditableTexture
                textureModel={gltfVrmParser?.getTextureModelFromIndex(
                  materialModel.sphereAdditionTextureIndex,
                )}
              />
            </Col>
          ) : (
            ''
          )}
          {Number.isInteger(materialModel.rimTextureIndex) ? (
            <Col xs={6} md={6}>
              <h5>Rim</h5>
              <EditableTexture
                textureModel={gltfVrmParser?.getTextureModelFromIndex(
                  materialModel.rimTextureIndex,
                )}
              />
            </Col>
          ) : (
            ''
          )}
        </Row>
      </Container>
    </Stack>
  );
}

MToonTextureForm.propTypes = {
  materialModel: PropTypes.instanceOf(MaterialModel),
};
MToonTextureForm.defaultProps = {
  materialModel: null,
};
