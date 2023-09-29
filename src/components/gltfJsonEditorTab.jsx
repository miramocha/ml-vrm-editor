import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import GltfVrmParser from '../utils/GltfVrmParser';

export default function GltfJsonEditorTab({ gltfVrmParser }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    gltfVrmParser?.setJson(JSON.parse(formData.get('gltfVrmJsonString')));

    // submitCallback(
    //   // JSON.parse(formData.get('gltfVrmJsonString').replace(/\r?\n|\r/g, '')),
    //   JSON.parse(formData.get('gltfVrmJsonString')),
    // );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>GLTF JSON Editor</h2>
      <Form.Group
        className="gltf-json-form"
        controlId="gltf-json-form.gltf-json-form-textarea"
      >
        <Form.Label>GLTF JSON</Form.Label>
        <Form.Control
          name="gltfVrmJsonString"
          as="textarea"
          rows={10}
          defaultValue={JSON.stringify(gltfVrmParser?.json)}
        />
        <Button variant="primary" type="submit">
          Save JSON
        </Button>
      </Form.Group>
    </Form>
  );
}

GltfJsonEditorTab.propTypes = {
  gltfVrmParser: PropTypes.instanceOf(GltfVrmParser),
};
GltfJsonEditorTab.defaultProps = {
  gltfVrmParser: null,
};
