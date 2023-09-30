import { useState } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Form, Stack } from 'react-bootstrap';
import GltfVrmParser from '../utils/GltfVrmParser';
// import MaterialModel from '../models/MaterialModel';
import MToonShadingForm from './forms/mToonShadingForm';
import MToonOutlineForm from './forms/mToonOutlineForm';
import MToonLightningForm from './forms/mToonLightningForm';

export default function MaterialEditor({ gltfVrmParser }) {
  const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0);
  //   const [currentMaterialModel, setCurrentMaterialModel] = useState(null);

  const handleMaterialSelectorSelect = (event) => {
    setCurrentMaterialIndex(event.target.value);
    // setCurrentMaterialModel(gltfVrmParser?.materialModels[event.target.value]);
  };

  return (
    <Stack gap={2}>
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

      <Form>
        <Accordion defaultActiveKey="lightingSettingsAccordionItem" alwaysOpen>
          <Accordion.Item eventKey="shadingSettingsAccordionItem">
            <Accordion.Header>
              <i className="bi bi-shadows me-2" /> Shading Settings
            </Accordion.Header>
            <Accordion.Body>
              <MToonShadingForm
                materialModel={
                  gltfVrmParser?.materialModels[currentMaterialIndex]
                }
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="outlineSettingsAccordionItem">
            <Accordion.Header>
              <i className="bi bi-pencil-fill me-2" /> Outline Settings
            </Accordion.Header>
            <Accordion.Body>
              <MToonOutlineForm
                materialModel={
                  gltfVrmParser?.materialModels[currentMaterialIndex]
                }
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="lightingSettingsAccordionItem">
            <Accordion.Header>
              <i className="bi  bi-lightbulb-fill me-2" /> Lighting Settings
            </Accordion.Header>
            <Accordion.Body>
              <MToonLightningForm
                materialModel={
                  gltfVrmParser?.materialModels[currentMaterialIndex]
                }
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Form>
    </Stack>
  );
}

MaterialEditor.propTypes = {
  gltfVrmParser: PropTypes.instanceOf(GltfVrmParser),
};
MaterialEditor.defaultProps = {
  gltfVrmParser: null,
};
