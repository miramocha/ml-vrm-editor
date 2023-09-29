import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import GltfVrmParser from '../utils/GltfVrmParser';

export default function GlobalVrmOutlineSettingsForm({ gltfVrmParser }) {
  const handleOutlineChangeSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);

    const propertyNameToVectorMap = new Map();
    propertyNameToVectorMap.set(
      '_OutlineColor',
      JSON.parse(formData.get('_OutlineColor')),
    );

    const propertyNameToFloatMap = new Map();
    propertyNameToFloatMap.set(
      '_OutlineWidth',
      Number(formData.get('_OutlineWidth')),
    );

    gltfVrmParser.setMaterialGlobalFloatProperties({ propertyNameToFloatMap });
    gltfVrmParser.setMaterialGlobalVectorProperties({
      propertyNameToVectorMap,
    });
  };

  return (
    <Form onSubmit={handleOutlineChangeSubmit}>
      <h2>Global Outline Settings</h2>
      <Form.Group className="vrm-global-outline-settings-form">
        <Form.Label>Global Outline Color</Form.Label>
        <Form.Control
          name="_OutlineColor"
          defaultValue="[0.40, 0.31, 0.37, 1]"
        />
        <Form.Label>Global Outline Width</Form.Label>
        <Form.Control name="_OutlineWidth" defaultValue="0.08" />
        <Button variant="primary" type="submit">
          Apply Global Outline Settings
        </Button>
      </Form.Group>
    </Form>
  );
}

GlobalVrmOutlineSettingsForm.propTypes = {
  gltfVrmParser: PropTypes.instanceOf(GltfVrmParser),
};
GlobalVrmOutlineSettingsForm.defaultProps = {
  gltfVrmParser: null,
};
