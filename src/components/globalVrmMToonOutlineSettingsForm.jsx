import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import GltfVrmParser from '../utils/GltfVrmParser';

export default function globalVrmMToonOutlineSettingsForm({ gltfVrmParser }) {
  const handleOutlineChangeSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);

    const skipMaterialNameSet = new Set(formData.getAll('skipMaterialName'));
    console.log('SKIPPING', skipMaterialNameSet);

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

    gltfVrmParser.setMaterialGlobalFloatProperties({
      propertyNameToFloatMap,
      skipMaterialNameSet,
    });
    gltfVrmParser.setMaterialGlobalVectorProperties({
      propertyNameToVectorMap,
      skipMaterialNameSet,
    });
  };

  return (
    <Form onSubmit={handleOutlineChangeSubmit}>
      <h2>Global MToon Outline Settings</h2>
      <Form.Group>
        <Form.Label>Global MToon Outline Color</Form.Label>
        <Form.Control
          name="_OutlineColor"
          defaultValue="[0.40, 0.31, 0.37, 1]"
        />
        <Form.Label>Global MToon Outline Width</Form.Label>
        <Form.Control name="_OutlineWidth" defaultValue="0.08" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Material Skips</Form.Label>
        <Form.Control as="select" name="skipMaterialName" multiple>
          {gltfVrmParser?.materialNames.map((materialName) => (
            <option
              value={materialName}
              key={`skipMaterialName.${materialName}`}
            >
              {materialName}
            </option>
          ))}
        </Form.Control>
        <Form.Text>
          Select material(s) to skip from applying global settings.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Apply Global Outline Settings
      </Button>
    </Form>
  );
}

globalVrmMToonOutlineSettingsForm.propTypes = {
  gltfVrmParser: PropTypes.instanceOf(GltfVrmParser),
};
globalVrmMToonOutlineSettingsForm.defaultProps = {
  gltfVrmParser: null,
};
