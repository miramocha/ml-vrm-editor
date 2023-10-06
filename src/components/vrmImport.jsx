import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import GltfVrmParser from '../utils/GltfVrmParser';
import { AppControllerContext } from '../AppContext';

export default function VrmImport({ setGltfVrmParser, onFileOpen }) {
  const appController = useContext(AppControllerContext);

  const handleFileChange = async (event) => {
    appController.isLoading = true;
    const newGltfVrmParser = new GltfVrmParser();
    await newGltfVrmParser.parseFile(event.target.files[0]);

    setGltfVrmParser(newGltfVrmParser);
    appController.loadVrm(await newGltfVrmParser.buildFile());
    appController.refreshGroup({ group: 'input' });
    onFileOpen();
    appController.isLoading = false;
  };

  return <Form.Control type="file" accept=".vrm" onChange={handleFileChange} />;
}

VrmImport.propTypes = {
  setGltfVrmParser: PropTypes.func,
  onFileOpen: PropTypes.func,
};
VrmImport.defaultProps = {
  setGltfVrmParser: () => {},
  onFileOpen: () => {},
};
