import { useContext } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { GltfVrmParserContext } from '../AppContext';

export default function GltfJsonEditor() {
  const gltfVrmParser = useContext(GltfVrmParserContext);
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
