import { useContext, useState } from 'react';
import { Accordion, Form, Stack, Button } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import MToonMainForm from './forms/materials/mToonMainForm';
import MToonShadingForm from './forms/materials/mToonShadingForm';
import MToonOutlineForm from './forms/materials/mToonOutlineForm';
import MToonLightingForm from './forms/materials/mToonLightingForm';
import MToonRimLightForm from './forms/materials/mToonRimLightForm';
import MToonEmissionForm from './forms/materials/mToonEmissionForm';
import MToonTextureForm from './forms/materials/mToonTextureForm';
import MToonAnimationForm from './forms/materials/mToonAnimationForm';
import MToonMiscForm from './forms/materials/mToonMiscForm';
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

    const currentModel =
      gltfVrmParser?.materialModels?.at(currentMaterialIndex);

    currentModel.processFormData(formData);

    gltfVrmParser.commitJsonChanges();
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
      {gltfVrmParser?.materialModels?.at(currentMaterialIndex).isMtoon ? (
        <Form onSubmit={handleMaterialChangeSubmit}>
          <Stack gap={2} className="mx-auto">
            <Accordion defaultActiveKey="mainSettingsAccordionItem">
              <Accordion.Item eventKey="textureSettingsAccordionItem">
                <Accordion.Header>
                  <i className="bi bi-image me-2" />{' '}
                  <Trans i18nKey="materialDescription.texture">Texture</Trans>
                </Accordion.Header>
                <Accordion.Body>
                  <MToonTextureForm
                    materialModel={gltfVrmParser?.materialModels?.at(
                      currentMaterialIndex,
                    )}
                    key={currentMaterialIndex}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="mainSettingsAccordionItem">
                <Accordion.Header>
                  <i className="bi bi-circle-fill me-2" />{' '}
                  <Trans i18nKey="materialDescription.main">Main</Trans>
                </Accordion.Header>
                <Accordion.Body>
                  <MToonMainForm
                    materialModel={gltfVrmParser?.materialModels?.at(
                      currentMaterialIndex,
                    )}
                    key={currentMaterialIndex}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="shadingSettingsAccordionItem">
                <Accordion.Header>
                  <i className="bi bi-shadows me-2" />{' '}
                  <Trans i18nKey="materialDescription.shading">Shading</Trans>
                </Accordion.Header>
                <Accordion.Body>
                  <MToonShadingForm
                    materialModel={gltfVrmParser?.materialModels?.at(
                      currentMaterialIndex,
                    )}
                    key={currentMaterialIndex}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="outlineSettingsAccordionItem">
                <Accordion.Header>
                  <i className="bi bi-circle me-2" />{' '}
                  <Trans i18nKey="materialDescription.outline">Outline</Trans>
                </Accordion.Header>
                <Accordion.Body>
                  <MToonOutlineForm
                    materialModel={gltfVrmParser?.materialModels?.at(
                      currentMaterialIndex,
                    )}
                    key={currentMaterialIndex}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="rimLightSettingsAccordionItem">
                <Accordion.Header>
                  <i className="bi bi-brightness-low me-2" />{' '}
                  <Trans i18nKey="materialDescription.rimLight">
                    Rim Light
                  </Trans>
                </Accordion.Header>
                <Accordion.Body>
                  <MToonRimLightForm
                    materialModel={gltfVrmParser?.materialModels?.at(
                      currentMaterialIndex,
                    )}
                    key={currentMaterialIndex}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="emissionSettingsAccordionItem">
                <Accordion.Header>
                  <i className="bi  bi-brightness-high me-2" />{' '}
                  <Trans i18nKey="materialDescription.emission">Emission</Trans>
                </Accordion.Header>
                <Accordion.Body>
                  <MToonEmissionForm
                    materialModel={gltfVrmParser?.materialModels?.at(
                      currentMaterialIndex,
                    )}
                    key={currentMaterialIndex}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="lightingSettingsAccordionItem">
                <Accordion.Header>
                  <i className="bi  bi-lightbulb me-2" />{' '}
                  <Trans i18nKey="materialDescription.lighting">Lighting</Trans>
                </Accordion.Header>
                <Accordion.Body>
                  <MToonLightingForm
                    materialModel={gltfVrmParser?.materialModels?.at(
                      currentMaterialIndex,
                    )}
                    key={currentMaterialIndex}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="animationSettingsAccordionItem">
                <Accordion.Header>
                  <i className="bi  bi-camera-reels me-2" />{' '}
                  <Trans i18nKey="materialDescription.textureAnimation">
                    Texture Animation
                  </Trans>
                </Accordion.Header>
                <Accordion.Body>
                  <MToonAnimationForm
                    materialModel={gltfVrmParser?.materialModels?.at(
                      currentMaterialIndex,
                    )}
                    key={currentMaterialIndex}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="miscSettingsAccordionItem">
                <Accordion.Header>
                  <i className="bi  bi-three-dots me-2" />{' '}
                  <Trans i18nKey="misc">Miscellaneous</Trans>
                </Accordion.Header>
                <Accordion.Body>
                  <MToonMiscForm
                    materialModel={gltfVrmParser?.materialModels?.at(
                      currentMaterialIndex,
                    )}
                    key={currentMaterialIndex}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Button variant="primary" type="submit">
              <Trans i18nKey="save">Save</Trans>
            </Button>
          </Stack>
        </Form>
      ) : (
        <div>This material does not use VRM MToon Shader</div>
      )}
    </Stack>
  );
}
