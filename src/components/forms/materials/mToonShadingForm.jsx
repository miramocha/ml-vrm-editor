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
          defaultColorHex={
            materialModel
              ? materialModel?.getValue('_ShadeColor').hex
              : '#ffffff'
          }
          defaultAlpha={
            materialModel ? materialModel?.getValue('_ShadeColor').alpha : 1.0
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Shade Shift</Form.Label>
        <Form.Control
          name="_ShadeShift"
          defaultValue={
            materialModel ? materialModel?.getValue('_ShadeShift') : 1.0
          }
          step={0.00001}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Shade Toony</Form.Label>
        <Form.Control
          name="_ShadeToony"
          defaultValue={
            materialModel ? materialModel?.getValue('_ShadeToony') : 1.0
          }
          step={0.00001}
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
