import PropTypes from 'prop-types';
import { useContext } from 'react';
import {
  Modal,
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  //   Stack,
} from 'react-bootstrap';
import { GltfVrmParserContext, AppControllerContext } from '../../AppContext';
import MaterialModel from '../../models/MaterialModel';

export default function SelectTextureModal({
  materialModel,
  textureSlot,
  setShowSelectTextureModal,
  showSelectTextureModal,
}) {
  const gltfVrmParser = useContext(GltfVrmParserContext);
  const appController = useContext(AppControllerContext);

  const handleSelectTextureModalHide = () => {
    setShowSelectTextureModal(false);
  };

  //   const handleAddTextureButtonClick = () => {
  //     appController.openAddTextureModal(() => {
  //       appController.openSelectTextureModal(materialModel, textureSlot);
  //     });
  //     appController.closeSelectTextureModal();
  //   };

  //   const textureIndexIsChecked = (index) => {
  //     switch (textureSlot) {
  //       case MaterialModel.TEXTURE_SLOTS.MAIN:
  //         return index === materialModel.mainTextureIndex;
  //       case MaterialModel.TEXTURE_SLOTS.SHADE:
  //         return index === materialModel.shadeTextureIndex;
  //       case MaterialModel.TEXTURE_SLOTS.EMISSIVE:
  //         return index === materialModel.emissiveTextureIndex;
  //       case MaterialModel.TEXTURE_SLOTS.NORMAL:
  //         return index === materialModel.normalTextureIndex;
  //       case MaterialModel.TEXTURE_SLOTS.SPHERE:
  //         return index === materialModel.sphereAdditionTextureIndex;
  //       case MaterialModel.TEXTURE_SLOTS.RIM:
  //         return index === materialModel.rimTextureIndex;
  //       default:
  //         return false;
  //     }
  //   };

  const handleTextureSelectSubmit = async (event) => {
    event.preventDefault();
    appController.isLoading = true;
    const formData = new FormData(event.target);
    const textureIndex = Number(formData.get('textureIndex'));

    switch (textureSlot) {
      case MaterialModel.TEXTURE_SLOTS.MAIN:
        materialModel.setMainTextureIndex(textureIndex);
        break;
      case MaterialModel.TEXTURE_SLOTS.SHADE:
        materialModel.setShadeTextureIndex(textureIndex);
        break;
      case MaterialModel.TEXTURE_SLOTS.EMISSIVE:
        materialModel.setEmissiveTextureIndex(textureIndex);
        break;
      case MaterialModel.TEXTURE_SLOTS.NORMAL:
        materialModel.setNormalTextureIndex(textureIndex);
        break;
      case MaterialModel.TEXTURE_SLOTS.SPHERE:
        materialModel.setSphereAdditionTextureIndex(textureIndex);
        break;
      case MaterialModel.TEXTURE_SLOTS.RIM:
        materialModel.setRimTextureIndex(textureIndex);
        break;
      default:
    }

    gltfVrmParser.commitJsonChanges(true);
    appController.loadVrm(await gltfVrmParser.buildFile());
    appController.isLoading = false;
    setShowSelectTextureModal(false);
  };

  return (
    <Modal
      size="lg"
      show={showSelectTextureModal}
      onHide={handleSelectTextureModalHide}
      centered
    >
      <Form onSubmit={handleTextureSelectSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Select Texture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              {gltfVrmParser?.textureModels.map((textureModel, index) => (
                <Col
                  key={`${textureModel?.bufferViewIndex}-${Math.random()}`}
                  xs={2}
                  md={2}
                >
                  <Form.Check type="radio" name="textureIndex" value={index} />
                  <Card className="mb-2">
                    <Card.Img src={textureModel?.imageSrc} />
                    <Card.ImgOverlay>{textureModel?.name}</Card.ImgOverlay>
                  </Card>
                </Col>
              ))}

              {/* <Col xs={2} md={2} className="d-grid">
                <Button
                  size="lg"
                  style={{ aspectRatio: '1/1' }}
                  onClick={handleAddTextureButtonClick}
                >
                  <Stack>
                    <i className="bi bi-plus-circle-fill h2" />
                  </Stack>
                </Button>
              </Col> */}
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Select Texture
          </Button>
          <Button variant="danger" onClick={handleSelectTextureModalHide}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

SelectTextureModal.propTypes = {
  materialModel: PropTypes.instanceOf(MaterialModel),
  textureSlot: PropTypes.string,
  setShowSelectTextureModal: PropTypes.func,
  showSelectTextureModal: PropTypes.bool,
};
SelectTextureModal.defaultProps = {
  materialModel: null,
  textureSlot: 'MAIN',
  setShowSelectTextureModal: () => {},
  showSelectTextureModal: false,
};
