import PropTypes from 'prop-types';
import { Form, Stack } from 'react-bootstrap';
import RgbaInput from '../../rgbaInput';
import MaterialModel from '../../../models/MaterialModel';

export default function MToonRimLightForm({ materialModel }) {
  return (
    <Stack gap={2} className="mx-auto">
      <Form.Group>
        <Form.Label>Rim Color</Form.Label>
        <RgbaInput
          name="_RimColor"
          defaultColorHex={
            materialModel ? materialModel?.getValue('_RimColor').hex : '#ffffff'
          }
          defaultAlpha={
            materialModel ? materialModel?.getValue('_RimColor').alpha : 1.0
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Rim Lift</Form.Label>
        <Form.Control
          name="_RimLift"
          defaultValue={
            materialModel ? materialModel?.getValue('_RimLift') : 0.001
          }
          step={0.00001}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Rim Fresnel Power</Form.Label>
        <Form.Control
          name="_RimFresnelPower"
          defaultValue={
            materialModel ? materialModel?.getValue('_RimFresnelPower') : 0.001
          }
          step={0.00001}
        />
      </Form.Group>
    </Stack>
  );
}

MToonRimLightForm.propTypes = {
  materialModel: PropTypes.instanceOf(MaterialModel),
};
MToonRimLightForm.defaultProps = {
  materialModel: null,
};
