import PropTypes from 'prop-types';
import { Form, Stack } from 'react-bootstrap';
import RgbaInput from '../../rgbaInput';
import MaterialModel from '../../../models/MaterialModel';

export default function MToonShadingForm({ materialModel }) {
  return (
    <Stack gap={2} className="mx-auto">
      <Form.Group>
        <Form.Label>Shade Color</Form.Label>
        <RgbaInput
          name="_ShadeColor"
          defaultColorHex={materialModel?.getValue('_ShadeColor').hex}
          defaultAlpha={materialModel?.getValue('_ShadeColor').alpha}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Receive Shadow Rate</Form.Label>
        <Form.Control
          type="number"
          name="_ReceiveShadowRate"
          defaultValue={materialModel?.getValue('_ReceiveShadowRate')}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Shade Shift</Form.Label>
        <Form.Control
          type="number"
          name="_ShadeShift"
          defaultValue={materialModel?.getValue('_ShadeShift')}
          step={0.00001}
          min={-1}
          max={1}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Shade Toony</Form.Label>
        <Form.Control
          type="number"
          name="_ShadeToony"
          defaultValue={materialModel?.getValue('_ShadeToony')}
          step={0.00001}
          min={0}
          max={1}
        />
      </Form.Group>
    </Stack>
  );
}

MToonShadingForm.propTypes = {
  materialModel: PropTypes.instanceOf(MaterialModel),
};
MToonShadingForm.defaultProps = {
  materialModel: null,
};
