import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import * as VrmJsonMaterialUtils from '../utils/VrmJsonMaterialUtils';

export default function GlobalVrmLightingSettingsForm({
  gltfVrmJsonString,
  submitCallback,
}) {
  const handleLightingChangeSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);

    const propertyNameToFloatMap = new Map();
    propertyNameToFloatMap.set(
      '_LightColorAttenuation',
      Number(formData.get('_LightColorAttenuation')),
    );

    const updatedJson = VrmJsonMaterialUtils.setGlobalFloatProperties({
      json: JSON.parse(gltfVrmJsonString),
      propertyNameToFloatMap,
    });

    submitCallback(updatedJson);
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
  gltfVrmJsonString: PropTypes.string,
  submitCallback: PropTypes.func,
};
GlobalVrmLightingSettingsForm.defaultProps = {
  gltfVrmJsonString: '',
  submitCallback: () => {},
};
