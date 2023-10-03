import { useContext } from 'react';
import { Button, Form, Stack, InputGroup } from 'react-bootstrap';
import RgbaInput from './rgbaInput';
import { GltfVrmParserContext, AppControllerContext } from '../AppContext';

export default function globalVrmMToonOutlineSettingsForm() {
  const gltfVrmParser = useContext(GltfVrmParserContext);
  const appController = useContext(AppControllerContext);

  const handleOutlineChangeSubmit = async (event) => {
    event.preventDefault();
    appController.isLoading = true;

    const formData = new FormData(event.target);
    console.log(formData);

    const skipMaterialNameSet = new Set(formData.getAll('skipMaterialName'));
    console.log('SKIPPING', skipMaterialNameSet);

    gltfVrmParser.materialModels.forEach((materialModel) =>
      materialModel.processMaterialFormData(formData),
    );

    gltfVrmParser.commitJsonCache();
    appController.loadVrm(await gltfVrmParser.buildFile());

    appController.refreshGroup({
      group: 'input',
    });
    appController.isLoading = false;
  };

  // TO DO - REPLACE THIS WITH MTOONOUTLINEFORM COMPONENT
  return (
    <Form onSubmit={handleOutlineChangeSubmit}>
      <Stack gap={2} className="mx-auto">
        <Form.Label>Outline Color</Form.Label>
        <InputGroup>
          <RgbaInput name="_OutlineColor" />
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
