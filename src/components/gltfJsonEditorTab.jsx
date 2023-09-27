import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

function handleChange(event) {
  console.log(event);
}

export default function GltfJsonEditorTab({ gltfVrmJsonString }) {
  return (
    <Form>
      <Form.Group
        className="gltf-json-form"
        controlId="gltf-json-form.gltf-json-form-textarea"
      >
        <Form.Label>GLTF JSON</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          value={gltfVrmJsonString}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary">Save JSON</Button>
    </Form>
  );
}

GltfJsonEditorTab.propTypes = {
  gltfVrmJsonString: PropTypes.string,
};
GltfJsonEditorTab.defaultProps = { gltfVrmJsonString: '' };
