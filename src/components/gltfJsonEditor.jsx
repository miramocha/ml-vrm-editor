import { useContext, useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import { GltfVrmParserContext, AppControllerContext } from '../AppContext';

const REFRESH_FUNCTION_ID = 'gltf-json-editor';
const REFRESH_FUNCTION_GROUP = 'input';

export default function GltfJsonEditor() {
  const gltfVrmParser = useContext(GltfVrmParserContext);

  const [renderId, setRenderId] = useState(REFRESH_FUNCTION_ID + Math.random());
  const appController = useContext(AppControllerContext);
  const refreshComponent = () => {
    setRenderId(REFRESH_FUNCTION_ID + Math.random());
  };
  appController.setIdToRefreshFunctionGroup({
    id: REFRESH_FUNCTION_ID,
    group: REFRESH_FUNCTION_GROUP,
    refreshFunction: refreshComponent,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    if (gltfVrmParser) {
      gltfVrmParser.setJson(JSON.parse(formData.get('gltfVrmJsonString')));
    }

    gltfVrmParser.commitJsonChanges();
    appController.loadVrm(await gltfVrmParser.buildFile());
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
            key={renderId}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          <Trans i18nKey="save">Save</Trans>
        </Button>
      </Stack>
    </Form>
  );
}
