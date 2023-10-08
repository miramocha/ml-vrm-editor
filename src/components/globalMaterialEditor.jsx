import { useContext } from 'react';
import { Accordion, Form, Stack, Button } from 'react-bootstrap';
import MToonMainForm from './forms/materials/mToonMainForm';
import MToonShadingForm from './forms/materials/mToonShadingForm';
import MToonOutlineForm from './forms/materials/mToonOutlineForm';
import MToonLightingForm from './forms/materials/mToonLightingForm';
import MToonRimLightForm from './forms/materials/mToonRimLightForm';
import MToonEmissionForm from './forms/materials/mToonEmissionForm';
import { GltfVrmParserContext, AppControllerContext } from '../AppContext';

export default function GlobalMaterialEditor() {
  const gltfVrmParser = useContext(GltfVrmParserContext);
  const appController = useContext(AppControllerContext);

  const handleGlobalMaterialChangeSubmit = async (event) => {
    event.preventDefault();
    appController.isLoading = true;

    const formData = new FormData(event.target);

    const skipMaterialNameSet = new Set(formData.getAll('skipMaterialName'));

    gltfVrmParser.materialModels.forEach((materialModel) => {
      if (!skipMaterialNameSet.has(materialModel.name)) {
        materialModel.processFormData(formData);
      }
    });

    gltfVrmParser.commitJsonChanges();
    appController.loadVrm(await gltfVrmParser.buildFile());

    // appController.refreshGroup({
    //   group: 'input',
    // });
    appController.isLoading = false;
  };

  const materialSkipsInput = (
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
  );

  return (
    <Accordion defaultActiveKey="mainSettingsAccordionItem">
      <Accordion.Item eventKey="mainSettingsAccordionItem">
        <Accordion.Header>
          <i className="bi bi-circle-fill me-2" /> Global Main
        </Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleGlobalMaterialChangeSubmit}>
            <Stack gap={2} className="mx-auto">
              <MToonMainForm />
              {materialSkipsInput}
              <Button variant="primary" type="submit">
                Apply Global Main Settings
              </Button>
            </Stack>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="shadingSettingsAccordionItem">
        <Accordion.Header>
          <i className="bi bi-shadows me-2" /> Global Shading
        </Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleGlobalMaterialChangeSubmit}>
            <Stack gap={2} className="mx-auto">
              <MToonShadingForm />
              {materialSkipsInput}
              <Button variant="primary" type="submit">
                Apply Global Shading Settings
              </Button>
            </Stack>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="outlineSettingsAccordionItem">
        <Accordion.Header>
          <i className="bi bi-circle me-2" /> Global Outline
        </Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleGlobalMaterialChangeSubmit}>
            <Stack gap={2} className="mx-auto">
              <MToonOutlineForm />
              {materialSkipsInput}
              <Button variant="primary" type="submit">
                Apply Global Outline Settings
              </Button>
            </Stack>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="rimLightSettingsAccordionItem">
        <Accordion.Header>
          <i className="bi bi-brightness-low me-2" /> Global Rim Light
        </Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleGlobalMaterialChangeSubmit}>
            <Stack gap={2} className="mx-auto">
              <MToonRimLightForm />
              {materialSkipsInput}
              <Button variant="primary" type="submit">
                Apply Global Rim Light Settings
              </Button>
            </Stack>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="emissionSettingsAccordionItem">
        <Accordion.Header>
          <i className="bi  bi-brightness-high me-2" /> Global Emission
        </Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleGlobalMaterialChangeSubmit}>
            <Stack gap={2} className="mx-auto">
              <MToonEmissionForm />
              {materialSkipsInput}
              <Button variant="primary" type="submit">
                Apply Global Emission Settings
              </Button>
            </Stack>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="lightingSettingsAccordionItem">
        <Accordion.Header>
          <i className="bi  bi-lightbulb-fill me-2" /> Global Lighting
        </Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleGlobalMaterialChangeSubmit}>
            <Stack gap={2} className="mx-auto">
              <MToonLightingForm />
              {materialSkipsInput}
              <Button variant="primary" type="submit">
                Apply Global Lighting Settings
              </Button>
            </Stack>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
