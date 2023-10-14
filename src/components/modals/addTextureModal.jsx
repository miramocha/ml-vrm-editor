import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Modal, Stack, Button, Form } from 'react-bootstrap';
import TextureModel from '../../models/TextureModel';
import BufferModel from '../../models/BufferModel';
import { AppControllerContext, GltfVrmParserContext } from '../../AppContext';

export default function AddTextureModal({ showAddTextureModal }) {
  const appController = useContext(AppControllerContext);
  const gltfVrmParser = useContext(GltfVrmParserContext);

  const handleAddTextureModalHide = () => {
    appController.closeAddTextureModal();
  };

  const handleFileChange = async (event) => {
    appController.isLoading = true;
    const file = event.target.files[0];

    const bufferModel = new BufferModel({
      bufferViewJson: {
        buffer: 0,
        byteLength: 0,
        byteOffset: 0,
      },
      buffer: new Uint8Array(await file.arrayBuffer()),
      accessorJson: null,
    });
    const textureModel = new TextureModel({
      bufferModel,
      imageJson: {
        bufferView: gltfVrmParser.bufferModelCache.length,
        mimeType: file.type,
        name: file.name,
      },
      textureJson: {
        sampler: 0, // No offset and auto-tiling for now
        source: gltfVrmParser.textureModelCache.length,
      },
    });

    gltfVrmParser.bufferModelCache.push(bufferModel);
    gltfVrmParser.jsonCache.bufferViews.push(bufferModel.bufferViewJson);
    gltfVrmParser.rebuildBinarychunk(false);

    gltfVrmParser.textureModelCache.push(textureModel);
    gltfVrmParser.jsonCache.textures.push(textureModel.textureJson);
    gltfVrmParser.jsonCache.images.push(textureModel.imageJson);
    gltfVrmParser.commitJsonChanges(true);

    appController.loadVrm(await gltfVrmParser.buildFile());
    appController.isLoading = false;
    appController.closeAddTextureModal();
  };

  return (
    <Modal
      show={showAddTextureModal}
      onHide={handleAddTextureModalHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Texture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Stack gap={2}>
          <Button variant="danger" onClick={handleAddTextureModalHide}>
            Cancel
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}

AddTextureModal.propTypes = {
  showAddTextureModal: PropTypes.bool,
};
AddTextureModal.defaultProps = {
  showAddTextureModal: false,
};
