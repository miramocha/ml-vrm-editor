import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

export default function GltfJsonEditorTab({
  gltfVrmJsonString,
  submitCallback,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    submitCallback(
      JSON.parse(formData.get('gltfVrmJsonString').replace(/\r?\n|\r/g, '')),
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group
        className="gltf-json-form"
        controlId="gltf-json-form.gltf-json-form-textarea"
      >
        <Form.Label>GLTF JSON</Form.Label>
        <Form.Control
          name="gltfVrmJsonString"
          as="textarea"
          rows={10}
          defaultValue={gltfVrmJsonString}
        />
        <Button variant="primary" type="submit">
          Save JSON
        </Button>
      </Form.Group>
    </Form>
  );
}

GltfJsonEditorTab.propTypes = {
  gltfVrmJsonString: PropTypes.string,
  submitCallback: PropTypes.func,
};
GltfJsonEditorTab.defaultProps = {
  gltfVrmJsonString: '',
  submitCallback: () => {},
};
