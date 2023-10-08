import PropTypes from 'prop-types';
import { Modal, Stack, Button, Card } from 'react-bootstrap';
import TextureModel from '../../models/TextureModel';

export default function TextureEditorModal({
  textureModel,
  showTextureEditorModal,
  setShowTextureEditorModal,
}) {
  // TextureModel.bufferModel.bufferViewJson
  // bufferView:
  // {
  //   "buffer": 0,
  //   "byteOffset": 0,
  //   "byteLength": 7744
  // },
  // {
  //   "buffer": 0,
  //   "byteOffset": 7744,
  //   "byteLength": 20352
  // },

  // TextureModel.imageJson
  //   images:     {
  //       "name": "v10_inner_mouth.png",
  //       "bufferView": 202,
  //       "mimeType": "image/png"
  //     },

  const handleTextureEditorModalHide = () => {
    setShowTextureEditorModal(false);
  };

  return (
    <Modal
      show={showTextureEditorModal}
      onHide={handleTextureEditorModalHide}
      size="sm"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Open VRM</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="mb-2">
          <Card.Img variant="top" src={textureModel.imageSrc} />
          <Card.Header>{textureModel.name}</Card.Header>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Stack>
          <Button variant="danger" onClick={handleTextureEditorModalHide}>
            Cancel
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}

TextureEditorModal.propTypes = {
  textureModel: PropTypes.instanceOf(TextureModel),
  showTextureEditorModal: PropTypes.bool,
  setShowTextureEditorModal: PropTypes.func,
};
TextureEditorModal.defaultProps = {
  textureModel: null,
  showTextureEditorModal: false,
  setShowTextureEditorModal: () => {},
};
