import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Modal, Stack, Button, Card, Form } from 'react-bootstrap';
import TextureModel from '../../models/TextureModel';
import { AppControllerContext, GltfVrmParserContext } from '../../AppContext';

export default function TextureEditorModal({
  textureModel,
  showTextureEditorModal,
  setShowTextureEditorModal,
}) {
  const appController = useContext(AppControllerContext);
  const gltfVrmParser = useContext(GltfVrmParserContext);

  const handleTextureEditorModalHide = () => {
    setShowTextureEditorModal(false);
  };

  const handleFileChange = async (event) => {
    appController.isLoading = true;
    const file = event.target.files[0];

    textureModel.setName(file.name);
    textureModel.setMimeType(file.type);
    // console.log(file.type);
    textureModel.setBuffer(new Uint8Array(await file.arrayBuffer()));

    gltfVrmParser.rebuildBinarychunk(false);
    gltfVrmParser.commitJsonChanges(true);
    appController.loadVrm(await gltfVrmParser.buildFile());

    // const newGltfVrmParser = new GltfVrmParser();
    // await newGltfVrmParser.parseFile(event.target.files[0]);

    // setGltfVrmParser(newGltfVrmParser);
    // appController.loadVrm(await newGltfVrmParser.buildFile());
    // appController.refreshGroup({ group: 'input' });
    // onFileOpen();
    appController.isLoading = false;
    appController.closeEditTextureModal();
  };

  return (
    <Modal
      show={showTextureEditorModal}
      onHide={handleTextureEditorModalHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit/Replace Texture</Modal.Title>
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
