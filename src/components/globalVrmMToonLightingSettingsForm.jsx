import { useContext } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { GltfVrmParserContext, AppControllerContext } from '../AppContext';

export default function GlobalVrmMToonLightingSettingsForm() {
  const gltfVrmParser = useContext(GltfVrmParserContext);
  const appController = useContext(AppControllerContext);

  const handleLightingChangeSubmit = async (event) => {
    appController.isLoading = true;
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);

    const skipMaterialNameSet = new Set(formData.getAll('skipMaterialName'));
    console.log('SKIPPING', skipMaterialNameSet);

    const propertyNameToFloatMap = new Map();
    propertyNameToFloatMap.set(
      '_LightColorAttenuation',
      Number(formData.get('_LightColorAttenuation')),
    );
    propertyNameToFloatMap.set(
      '_IndirectLightIntensity',
      Number(formData.get('_IndirectLightIntensity')),
    );

    gltfVrmParser.setMaterialGlobalFloatProperties({
      propertyNameToFloatMap,
      skipMaterialNameSet,
    });

    gltfVrmParser.commitJsonCache();
    appController.loadVrm(await gltfVrmParser.buildFile());

    appController.refreshGroup({
      group: 'input',
    });
    appController.isLoading = false;
  };

  return (
    <Form onSubmit={handleLightingChangeSubmit}>
      <Stack gap={2} className="mx-auto">
        <Form.Group>
          <Form.Label>Light Color Attenuation</Form.Label>
          {/* <Form.Control name="_LightColorAttenuation" defaultValue="1" /> */}
          <Form.Control
            type="number"
            name="_LightColorAttenuation"
            defaultValue={1}
            max={1}
            min={0}
            step={1}
          />
          <Form.Text>
            Set the influence of the light source color.
            <dl>
              <dt>
                <code>0</code>
              </dt>
              <dd>Affected by the light source color.</dd>
              <dt>
                <code>1</code>
              </dt>
              <dd>
                Not affected by the light source color. It only reflects the
                luminance of the light source color.
              </dd>
            </dl>
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Indirect Light Intensity</Form.Label>
          <Form.Control
            type="number"
            name="_IndirectLightIntensity"
            defaultValue={0}
            min={0}
            step={0.01}
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
          Apply Global Lighting Settings
        </Button>
      </Stack>
    </Form>
  );
}
