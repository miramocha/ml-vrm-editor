import { useContext, useState } from 'react';
import { Accordion, Form, Stack, Button } from 'react-bootstrap';
import MToonShadingForm from './forms/mToonShadingForm';
import MToonOutlineForm from './forms/mToonOutlineForm';
import MToonLightningForm from './forms/mToonLightningForm';
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
    const formData = new FormData(event.target);
    console.log(formData);

    const currentModel =
      gltfVrmParser?.materialModels?.at(currentMaterialIndex);

    currentModel.shadeColor = {
      colorHex: formData.get('_ShadeColorHex'),
      alpha: Number(formData.get('_ShadeAlpha')),
    };

    currentModel.outlineColor = {
      colorHex: formData.get('_OutlineColorHex'),
      alpha: Number(formData.get('_OutlineAlpha')),
    };
    currentModel.outlineWidth = Number(formData.get('_OutlineWidth'));

    currentModel.lightColorAttunation = Number(
      formData.get('_LightColorAttenuation'),
    );
    currentModel.indirectLightIntensity = Number(
      formData.get('_IndirectLightIntensity'),
    );

    console.log('UPDATED MATERIAL:', currentModel.vrmMaterialJson);

    gltfVrmParser.commitJsonCache();
    appController.loadVrm(await gltfVrmParser.buildFile());
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
      <Form onSubmit={handleMaterialChangeSubmit} key={renderId}>
        <Stack gap={2} className="mx-auto">
          <Accordion defaultActiveKey="outlineSettingsAccordionItem">
            <Accordion.Item eventKey="shadingSettingsAccordionItem">
              <Accordion.Header>
                <i className="bi bi-shadows me-2" /> Shading Settings
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
                <i className="bi bi-pencil-fill me-2" /> Outline Settings
              </Accordion.Header>
              <Accordion.Body>
                <MToonOutlineForm
                  materialModel={gltfVrmParser?.materialModels?.at(
                    currentMaterialIndex,
                  )}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="lightingSettingsAccordionItem">
              <Accordion.Header>
                <i className="bi  bi-lightbulb-fill me-2" /> Lighting Settings
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
