import PropTypes from 'prop-types';
import { Button, Form, Stack, InputGroup } from 'react-bootstrap';
import GltfVrmParser from '../utils/GltfVrmParser';
import * as ColorUtils from '../utils/ColorUtils';

export default function globalVrmMToonOutlineSettingsForm({ gltfVrmParser }) {
  const handleOutlineChangeSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);

    const skipMaterialNameSet = new Set(formData.getAll('skipMaterialName'));
    console.log('SKIPPING', skipMaterialNameSet);

    const propertyNameToVectorMap = new Map();
    propertyNameToVectorMap.set('_OutlineColor', [
      ...ColorUtils.hexToColorUIVector(formData.get('_OutlineColorHex')),
      Number(formData.get('_OutlineColorAlpha')),
    ]);

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
      <Stack gap={2} className="mx-auto">
        <Form.Label>Outline Color</Form.Label>
        <InputGroup>
          {/* <Form.Control
            name="_OutlineColor"
            defaultValue="[0.40, 0.31, 0.37, 1]"
          /> */}
          <InputGroup.Text>Color</InputGroup.Text>
          <Form.Control
            name="_OutlineColorHex"
            type="color"
            defaultValue="#67505F"
          />
          <InputGroup.Text>Alpha</InputGroup.Text>
          <Form.Control
            name="_OutlineColorAlpha"
            type="number"
            defaultValue={1.0}
            step={0.01}
            min={0}
            max={1}
          />
        </InputGroup>
        <Form.Group>
          <Form.Label>Outline Width</Form.Label>
          <Form.Control
            name="_OutlineWidth"
            type="number"
            defaultValue={0.08}
            step={0.01}
            min={0}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Material Skips</Form.Label>
          <Form.Control as="select" name="skipMaterialName" multiple>
            {gltfVrmParser?.materialModels.map((materialModel) => (
              <option
                value={materialModel.name}
                key={`skipMaterialName.${materialModel.name}`}
              >
                {materialModel.name}
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
      </Stack>
    </Form>
  );
}

globalVrmMToonOutlineSettingsForm.propTypes = {
  gltfVrmParser: PropTypes.instanceOf(GltfVrmParser),
};
globalVrmMToonOutlineSettingsForm.defaultProps = {
  gltfVrmParser: null,
};
