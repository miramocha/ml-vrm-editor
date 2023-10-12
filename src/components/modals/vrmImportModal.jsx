import PropTypes from 'prop-types';
import { Modal, Stack, Button } from 'react-bootstrap';
import VrmImport from '../vrmImport';

export default function VrmImportModal({
  showVrmImportModal,
  setShowVrmImportModal,
  setGltfVrmParser,
}) {
  const handleVrmImportModalHide = () => {
    setShowVrmImportModal(false);
  };

  return (
    <Modal
      show={showVrmImportModal}
      onHide={handleVrmImportModalHide}
      size="sm"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Open VRM</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <VrmImport
          onFileOpen={handleVrmImportModalHide}
          setGltfVrmParser={setGltfVrmParser}
        />
      </Modal.Body>
      <Modal.Footer>
        <Stack>
          <Button variant="danger" onClick={handleVrmImportModalHide}>
            Cancel
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}

VrmImportModal.propTypes = {
  showVrmImportModal: PropTypes.bool,
  setShowVrmImportModal: PropTypes.func,
  setGltfVrmParser: PropTypes.func,
};
VrmImportModal.defaultProps = {
  showVrmImportModal: false,
  setShowVrmImportModal: () => {},
  setGltfVrmParser: () => {},
};
