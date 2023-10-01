import { useContext, useState } from 'react';
import { Button, Form, Stack, InputGroup } from 'react-bootstrap';
import * as ColorUtils from '../utils/ColorUtils';
import RgbaInput from './rgbaInput';
import { GltfVrmParserContext, AppControllerContext } from '../AppContext';

const REFRESH_FUNCTION_ID = 'global-outline-settings-form';
const REFRESH_FUNCTION_GROUP = 'input';

export default function globalVrmMToonOutlineSettingsForm() {
  const gltfVrmParser = useContext(GltfVrmParserContext);

  const [renderId, setRenderId] = useState(REFRESH_FUNCTION_ID + Math.random());
  const appController = useContext(AppControllerContext);
  const refreshComponent = () => {
    setRenderId(REFRESH_FUNCTION_ID + Math.random());
  };
  appController.setIdToRefreshFunctionGroup({
    id: REFRESH_FUNCTION_ID,
    group: REFRESH_FUNCTION_GROUP,
    refreshFunction: refreshComponent,
  });

  const handleOutlineChangeSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);

    const skipMaterialNameSet = new Set(formData.getAll('skipMaterialName'));
    console.log('SKIPPING', skipMaterialNameSet);

    const propertyNameToVectorMap = new Map();
    propertyNameToVectorMap.set('_OutlineColor', [
      ...ColorUtils.hexToColorUIVector(formData.get('_OutlineColorHex')),
      Number(formData.get('_OutlineAlpha')),
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

    appController.refreshGroup({ group: 'input' });
  };

  // TO DO - REPLACE THIS WITH MTOONOUTLINEFORM COMPONENT
  return (
    <Form onSubmit={handleOutlineChangeSubmit} key={renderId}>
      <Stack gap={2} className="mx-auto">
        <Form.Label>Outline Color</Form.Label>
        <InputGroup>
          <RgbaInput name="_Outline" defaultColorHex="#67505F" />
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
                key={`skipMaterialName-${materialModel.name}`}
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
