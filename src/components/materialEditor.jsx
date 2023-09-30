import PropTypes from 'prop-types';
import { Accordion, Form, Stack } from 'react-bootstrap';
import GltfVrmParser from '../utils/GltfVrmParser';

export default function MaterialEditor({ gltfVrmParser }) {
  return (
    <Stack gap={2}>
      <Form.Group>
        <Form.Label>Select Material</Form.Label>
        <Form.Select>
          {gltfVrmParser?.materialModels.map((materialModel) => (
            <option value={materialModel.materialIndex} key={Math.random()}>
              {materialModel.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Accordion defaultActiveKey="outlineSettingsAccordionItem" alwaysOpen>
        <Accordion.Item eventKey="shadingSettingsAccordionItem">
          <Accordion.Header>
            <i className="bi bi-shadows me-2" /> Shading Settings
          </Accordion.Header>
          <Accordion.Body>OUTLINE</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="outlineSettingsAccordionItem">
          <Accordion.Header>
            <i className="bi bi-pencil-fill me-2" /> Outline Settings
          </Accordion.Header>
          <Accordion.Body>OUTLINE</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="lightingSettingsAccordionItem">
          <Accordion.Header>
            <i className="bi  bi-lightbulb-fill me-2" /> Lighting Settings
          </Accordion.Header>
          <Accordion.Body>LIGHTING</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
}

MaterialEditor.propTypes = {
  gltfVrmParser: PropTypes.instanceOf(GltfVrmParser),
};
MaterialEditor.defaultProps = {
  gltfVrmParser: null,
};
