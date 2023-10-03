import { useContext, useState } from 'react';
import { Accordion, Form, Stack, Button } from 'react-bootstrap';
import MToonMainForm from './forms/materials/mToonMainForm';
import MToonShadingForm from './forms/materials/mToonShadingForm';
import MToonOutlineForm from './forms/materials/mToonOutlineForm';
import MToonLightningForm from './forms/materials/mToonLightningForm';
import MToonRimLightForm from './forms/materials/mToonRimLightForm';
import MToonEmissionForm from './forms/materials/mToonEmissionForm';
import { GltfVrmParserContext, AppControllerContext } from '../AppContext';

const REFRESH_FUNCTION_ID = 'material-editor';
const REFRESH_FUNCTION_GROUP = 'input';

export default function MaterialEditor() {
  const gltfVrmParser = useContext(GltfVrmParserContext);
  const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0);

  const appController = useContext(AppControllerContext);

  const [renderId, setRenderId] = useState(REFRESH_FUNCTION_ID + Math.random());
  const refreshComponent = () => {
    setRenderId(REFRESH_FUNCTION_ID + Math.random());
  };
  appController.setIdToRefreshFunctionGroup({
    id: REFRESH_FUNCTION_ID,
    group: REFRESH_FUNCTION_GROUP,
    refreshFunction: refreshComponent,
  });

  const handleMaterialSelectorSelect = (event) => {
    setCurrentMaterialIndex(event.target.value);
  };

  const handleMaterialChangeSubmit = async (event) => {
    event.preventDefault();
    appController.isLoading = true;

    const formData = new FormData(event.target);
    console.log('SUBMIT MAT CHANGE:', formData);

    const currentModel =
      gltfVrmParser?.materialModels?.at(currentMaterialIndex);

    currentModel.processMaterialFormData(formData);

    gltfVrmParser.commitJsonCache();
    appController.loadVrm(await gltfVrmParser.buildFile());
    appController.isLoading = false;
  };

  return (
    <Stack gap={2} key={renderId}>
      <Form.Group>
        <Form.Label>Select Material</Form.Label>
        <Form.Select onChange={handleMaterialSelectorSelect}>
          {gltfVrmParser?.materialModels.map((materialModel) => (
            <option
              value={materialModel.materialIndex}
              key={materialModel.materialIndex}
            >
              {materialModel.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form onSubmit={handleMaterialChangeSubmit} key={currentMaterialIndex}>
        <Stack gap={2} className="mx-auto">
          <Accordion defaultActiveKey="mainSettingsAccordionItem">
            <Accordion.Item eventKey="mainSettingsAccordionItem">
              <Accordion.Header>
                <i className="bi bi-circle-fill me-2" /> Main
              </Accordion.Header>
              <Accordion.Body>
                <MToonMainForm
                  materialModel={gltfVrmParser?.materialModels?.at(
                    currentMaterialIndex,
                  )}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="shadingSettingsAccordionItem">
              <Accordion.Header>
                <i className="bi bi-shadows me-2" /> Shading
              </Accordion.Header>
              <Accordion.Body>
                <MToonShadingForm
                  materialModel={gltfVrmParser?.materialModels?.at(
                    currentMaterialIndex,
                  )}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="outlineSettingsAccordionItem">
              <Accordion.Header>
                <i className="bi bi-circle me-2" /> Outline
              </Accordion.Header>
              <Accordion.Body>
                <MToonOutlineForm
                  materialModel={gltfVrmParser?.materialModels?.at(
                    currentMaterialIndex,
                  )}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="rimLightSettingsAccordionItem">
              <Accordion.Header>
                <i className="bi bi-brightness-low me-2" /> Rim Light
              </Accordion.Header>
              <Accordion.Body>
                <MToonRimLightForm
                  materialModel={gltfVrmParser?.materialModels?.at(
                    currentMaterialIndex,
                  )}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="emissionSettingsAccordionItem">
              <Accordion.Header>
                <i className="bi  bi-brightness-high me-2" /> Emission
              </Accordion.Header>
              <Accordion.Body>
                <MToonEmissionForm
                  materialModel={gltfVrmParser?.materialModels?.at(
                    currentMaterialIndex,
                  )}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="lightingSettingsAccordionItem">
              <Accordion.Header>
                <i className="bi  bi-lightbulb-fill me-2" /> Lighting
              </Accordion.Header>
              <Accordion.Body>
                <MToonLightningForm
                  materialModel={gltfVrmParser?.materialModels?.at(
                    currentMaterialIndex,
                  )}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Button variant="primary" type="submit">
            Save Material
          </Button>
        </Stack>
      </Form>
    </Stack>
  );
}
