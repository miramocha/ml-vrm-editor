import PropTypes from 'prop-types';
import { Button, Form, Stack } from 'react-bootstrap';
import GltfVrmParser from '../utils/GltfVrmParser';

export default function GltfJsonEditor({ gltfVrmParser }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    if (gltfVrmParser) {
      gltfVrmParser.setJson(JSON.parse(formData.get('gltfVrmJsonString')));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={2} className="mx-auto">
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
            key={JSON.stringify(gltfVrmParser?.json)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save JSON
        </Button>
      </Stack>
    </Form>
  );
}

GltfJsonEditor.propTypes = {
  gltfVrmParser: PropTypes.instanceOf(GltfVrmParser),
};
GltfJsonEditor.defaultProps = {
  gltfVrmParser: null,
};
