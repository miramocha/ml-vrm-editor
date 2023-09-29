import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import GltfVrmParser from '../utils/GltfVrmParser';

export default function GlobalVrmLightingSettingsForm({ gltfVrmParser }) {
  const handleLightingChangeSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);

    const propertyNameToFloatMap = new Map();
    propertyNameToFloatMap.set(
      '_LightColorAttenuation',
      Number(formData.get('_LightColorAttenuation')),
    );

    gltfVrmParser.setMaterialGlobalFloatProperties({ propertyNameToFloatMap });
  };

  return (
    <Form onSubmit={handleLightingChangeSubmit}>
      <h2>Global Lighting Settings</h2>
      <Form.Group className="vrm-global-outline-settings-form">
        <Form.Label>Global Lightcolor Attenuation</Form.Label>
        <Form.Control name="_LightColorAttenuation" defaultValue="1" />
        <Button variant="primary" type="submit">
          Apply Global Lighting Settings
        </Button>
      </Form.Group>
    </Form>
  );
}

GlobalVrmLightingSettingsForm.propTypes = {
  gltfVrmParser: PropTypes.instanceOf(GltfVrmParser),
};
GlobalVrmLightingSettingsForm.defaultProps = {
  gltfVrmParser: null,
};
