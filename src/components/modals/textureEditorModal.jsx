import PropTypes from 'prop-types';
import { Modal, Stack, Button, Card } from 'react-bootstrap';
import TextureModel from '../../models/TextureModel';

export default function TextureEditorModal({
  textureModel,
  showTextureEditorModal,
  setShowTextureEditorModal,
}) {
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
