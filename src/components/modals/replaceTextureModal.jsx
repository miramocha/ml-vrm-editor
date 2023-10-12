import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Modal, Stack, Button, Card, Form } from 'react-bootstrap';
import TextureModel from '../../models/TextureModel';
import { AppControllerContext, GltfVrmParserContext } from '../../AppContext';

export default function ReplaceTextureModal({
  textureModel,
  showReplaceTextureModal,
  setShowReplaceTextureModal,
}) {
  const appController = useContext(AppControllerContext);
  const gltfVrmParser = useContext(GltfVrmParserContext);

  const handleReplaceTextureModalHide = () => {
    setShowReplaceTextureModal(false);
  };

  const handleFileChange = async (event) => {
    appController.isLoading = true;
    const file = event.target.files[0];

    textureModel.setName(file.name);
    textureModel.setMimeType(file.type);
    textureModel.setBuffer(new Uint8Array(await file.arrayBuffer()));

    gltfVrmParser.rebuildBinarychunk(false);
    gltfVrmParser.commitJsonChanges(true);
    appController.loadVrm(await gltfVrmParser.buildFile());
    appController.isLoading = false;
    appController.closeReplaceTextureModal();
  };

  const handleDownloadButtonClick = async () => {
    const blobURL = textureModel.imageSrc;
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', textureModel.name);
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  return (
    <Modal
      show={showReplaceTextureModal}
      onHide={handleReplaceTextureModalHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Replace Texture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="mb-2">
          <Card.Img variant="top" src={textureModel?.imageSrc} />
          <Card.Header>{textureModel?.name}</Card.Header>
          <Card.Body>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Stack gap={2}>
          <Button onClick={handleDownloadButtonClick}>
            <i className="bi bi-download" /> Download
          </Button>
          <Button variant="danger" onClick={handleReplaceTextureModalHide}>
            Cancel
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}

ReplaceTextureModal.propTypes = {
  textureModel: PropTypes.instanceOf(TextureModel),
  showReplaceTextureModal: PropTypes.bool,
  setShowReplaceTextureModal: PropTypes.func,
};
ReplaceTextureModal.defaultProps = {
  textureModel: null,
  showReplaceTextureModal: false,
  setShowReplaceTextureModal: () => {},
};
