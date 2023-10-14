import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Stack, Container, Row, Col, Button, Card } from 'react-bootstrap';
import MaterialModel from '../../../models/MaterialModel';
import {
  GltfVrmParserContext,
  AppControllerContext,
} from '../../../AppContext';

export default function MToonTextureForm({ materialModel }) {
  const gltfVrmParser = useContext(GltfVrmParserContext);
  const appController = useContext(AppControllerContext);

  const handleSelectMainTextureButtonClick = () => {
    appController.openSelectTextureModal(
      materialModel,
      MaterialModel.TEXTURE_SLOTS.MAIN,
    );
  };

  const handleSelectShadeTextureButtonClick = () => {
    appController.openSelectTextureModal(
      materialModel,
      MaterialModel.TEXTURE_SLOTS.SHADE,
    );
  };

  const handleSelectNormalTextureButtonClick = () => {
    appController.openSelectTextureModal(
      materialModel,
      MaterialModel.TEXTURE_SLOTS.NORMAL,
    );
  };

  const handleSelectEmissiveTextureButtonClick = () => {
    appController.openSelectTextureModal(
      materialModel,
      MaterialModel.TEXTURE_SLOTS.EMISSIVE,
    );
  };

  const handleSelectSphereTextureButtonClick = () => {
    appController.openSelectTextureModal(
      materialModel,
      MaterialModel.TEXTURE_SLOTS.SPHERE,
    );
  };

  const handleSelectRimTextureButtonClick = () => {
    appController.openSelectTextureModal(
      materialModel,
      MaterialModel.TEXTURE_SLOTS.RIM,
    );
  };

  const NO_TEXTURE_ASSIGNED_MESSAGE = 'No Texture Assigned';

  return (
    <Stack gap={2} className="mx-auto">
      <Container>
        <Row>
          <Col xs={6} md={6}>
            <h5>Main</h5>
            <Card className="mb-2" style={{ aspectRatio: '1/1' }}>
              {Number.isInteger(materialModel.mainTextureIndex) ? (
                <Card.Img
                  src={
                    gltfVrmParser.getTextureModelFromIndex(
                      materialModel.mainTextureIndex,
                    ).imageSrc
                  }
                />
              ) : (
                ''
              )}
              <Card.ImgOverlay>
                <Card.Title>
                  {Number.isInteger(materialModel.mainTextureIndex)
                    ? gltfVrmParser.getTextureModelFromIndex(
                        materialModel.mainTextureIndex,
                      ).name
                    : NO_TEXTURE_ASSIGNED_MESSAGE}
                </Card.Title>
                <Button
                  variant="primary"
                  onClick={handleSelectMainTextureButtonClick}
                  size="sm"
                  style={{ position: 'absolute', bottom: 0, right: 0 }}
                >
                  <i className="bi bi-pencil-square" /> Select
                </Button>
              </Card.ImgOverlay>
            </Card>
          </Col>

          <Col xs={6} md={6}>
            <h5>Shading</h5>
            <Card className="mb-2" style={{ aspectRatio: '1/1' }}>
              {Number.isInteger(materialModel.shadeTextureIndex) ? (
                <Card.Img
                  src={
                    gltfVrmParser.getTextureModelFromIndex(
                      materialModel.shadeTextureIndex,
                    ).imageSrc
                  }
                />
              ) : (
                ''
              )}
              <Card.ImgOverlay>
                <Card.Title>
                  {Number.isInteger(materialModel.shadeTextureIndex)
                    ? gltfVrmParser.getTextureModelFromIndex(
                        materialModel.shadeTextureIndex,
                      ).name
                    : NO_TEXTURE_ASSIGNED_MESSAGE}
                </Card.Title>
                <Button
                  variant="primary"
                  onClick={handleSelectShadeTextureButtonClick}
                  size="sm"
                  style={{ position: 'absolute', bottom: 0, right: 0 }}
                >
                  <i className="bi bi-pencil-square" /> Select
                </Button>
              </Card.ImgOverlay>
            </Card>
          </Col>

          <Col xs={6} md={6}>
            <h5>Normal</h5>
            <Card className="mb-2" style={{ aspectRatio: '1/1' }}>
              {Number.isInteger(materialModel.normalTextureIndex) ? (
                <Card.Img
                  src={
                    gltfVrmParser.getTextureModelFromIndex(
                      materialModel.normalTextureIndex,
                    ).imageSrc
                  }
                />
              ) : (
                ''
              )}
              <Card.ImgOverlay>
                <Card.Title>
                  {Number.isInteger(materialModel.normalTextureIndex)
                    ? gltfVrmParser.getTextureModelFromIndex(
                        materialModel.normalTextureIndex,
                      ).name
                    : NO_TEXTURE_ASSIGNED_MESSAGE}
                </Card.Title>
                <Button
                  variant="primary"
                  onClick={handleSelectNormalTextureButtonClick}
                  size="sm"
                  style={{ position: 'absolute', bottom: 0, right: 0 }}
                >
                  <i className="bi bi-pencil-square" /> Select
                </Button>
              </Card.ImgOverlay>
            </Card>
          </Col>
          <Col xs={6} md={6}>
            <h5>Emission</h5>
            <Card className="mb-2" style={{ aspectRatio: '1/1' }}>
              {Number.isInteger(materialModel.emissiveTextureIndex) ? (
                <Card.Img
                  src={
                    gltfVrmParser.getTextureModelFromIndex(
                      materialModel.emissiveTextureIndex,
                    ).imageSrc
                  }
                />
              ) : (
                ''
              )}
              <Card.ImgOverlay>
                <Card.Title>
                  {Number.isInteger(materialModel.emissiveTextureIndex)
                    ? gltfVrmParser.getTextureModelFromIndex(
                        materialModel.emissiveTextureIndex,
                      ).name
                    : NO_TEXTURE_ASSIGNED_MESSAGE}
                </Card.Title>
                <Button
                  variant="primary"
                  onClick={handleSelectEmissiveTextureButtonClick}
                  size="sm"
                  style={{ position: 'absolute', bottom: 0, right: 0 }}
                >
                  <i className="bi bi-pencil-square" /> Select
                </Button>
              </Card.ImgOverlay>
            </Card>
          </Col>

          <Col xs={6} md={6}>
            <h5>Sphere</h5>
            <Card className="mb-2" style={{ aspectRatio: '1/1' }}>
              {Number.isInteger(materialModel.sphereAdditionIndex) ? (
                <Card.Img
                  src={
                    gltfVrmParser.getTextureModelFromIndex(
                      materialModel.emissiveTextureIndex,
                    ).imageSrc
                  }
                />
              ) : (
                ''
              )}
              <Card.ImgOverlay>
                <Card.Title>
                  {Number.isInteger(materialModel.sphereAdditionIndex)
                    ? gltfVrmParser.getTextureModelFromIndex(
                        materialModel.emissiveTextureIndex,
                      ).name
                    : NO_TEXTURE_ASSIGNED_MESSAGE}
                </Card.Title>
                <Button
                  variant="primary"
                  onClick={handleSelectSphereTextureButtonClick}
                  size="sm"
                  style={{ position: 'absolute', bottom: 0, right: 0 }}
                >
                  <i className="bi bi-pencil-square" /> Select
                </Button>
              </Card.ImgOverlay>
            </Card>
          </Col>

          <Col xs={6} md={6}>
            <h5>Rim</h5>
            <Card className="mb-2" style={{ aspectRatio: '1/1' }}>
              {Number.isInteger(materialModel.rimTextureIndex) ? (
                <Card.Img
                  src={
                    gltfVrmParser.getTextureModelFromIndex(
                      materialModel.rimTextureIndex,
                    ).imageSrc
                  }
                />
              ) : (
                ''
              )}
              <Card.ImgOverlay>
                <Card.Title>
                  {Number.isInteger(materialModel.rimTextureIndex)
                    ? gltfVrmParser.getTextureModelFromIndex(
                        materialModel.rimTextureIndex,
                      ).name
                    : NO_TEXTURE_ASSIGNED_MESSAGE}
                </Card.Title>
                <Button
                  variant="primary"
                  onClick={handleSelectRimTextureButtonClick}
                  size="sm"
                  style={{ position: 'absolute', bottom: 0, right: 0 }}
                >
                  <i className="bi bi-pencil-square" /> Select
                </Button>
              </Card.ImgOverlay>
            </Card>
          </Col>
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
