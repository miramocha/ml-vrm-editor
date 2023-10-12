/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Modal, Stack, Button, Card, Form } from 'react-bootstrap';
import TextureModel from '../../models/TextureModel';
import BufferModel from '../../models/BufferModel';
import { AppControllerContext, GltfVrmParserContext } from '../../AppContext';

export default function AddTextureModal({
  showAddTextureModal,
  setShowAddTextureModal,
}) {
  const appController = useContext(AppControllerContext);
  const gltfVrmParser = useContext(GltfVrmParserContext);

  const handleAddTextureModalHide = () => {
    setShowAddTextureModal(false);
  };

  const handleFileChange = async (event) => {
    appController.isLoading = true;
    const file = event.target.files[0];

    // Texture does not have accessor
    // json -> images[index] ->     {
    //   "name": "v10_inner_mouth.png",
    //   "bufferView": 202,
    //   "mimeType": "image/png"
    // },
    // json -> buffersView[index] ->     {
    //   "buffer": 0,
    //   "byteOffset": 0,
    //   "byteLength": 7744
    // },
    // json -> textures[index] ->     {
    //   "sampler": 2,
    //   "source": 43
    // }
    const bufferModel = new BufferModel({
      bufferViewJson: {}, // Will be recalculated
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

    gltfVrmParser.addBufferModel(bufferModel);
    gltfVrmParser.addTextureModel(textureModel);
    console.log(
      'TEXTURE CACHE PREBUILT:',
      gltfVrmParser.textureModelCache.length,
    );
    console.log('JSON -> textures:', gltfVrmParser.json.textures);

    console.log('textureModels:', gltfVrmParser.textureModels.length);
    console.log('JSON -> images:', gltfVrmParser.json.images);

    gltfVrmParser.commitJsonChanges();
    gltfVrmParser.rebuildBinarychunk(true);

    appController.loadVrm(await gltfVrmParser.buildFile());
    console.log(
      'TEXTURE CACHE POSTBUILT:',
      gltfVrmParser.textureModelCache.length,
    );
    console.log('JSON -> textures:', gltfVrmParser.json.textures);
    console.log('JSON -> images:', gltfVrmParser.json.images);
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
  setShowAddTextureModal: PropTypes.func,
};
AddTextureModal.defaultProps = {
  showAddTextureModal: false,
  setShowAddTextureModal: () => {},
};
