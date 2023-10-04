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
          defaultColorHex={materialModel?.getValue('_RimColor').hex}
          defaultAlpha={materialModel?.getValue('_RimColor').alpha}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Rim Lift</Form.Label>
        <Form.Control
          name="_RimLift"
          defaultValue={materialModel?.getValue('_RimLift')}
          step={0.00001}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Rim Fresnel Power</Form.Label>
        <Form.Control
          name="_RimFresnelPower"
          defaultValue={materialModel?.getValue('_RimFresnelPower')}
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
