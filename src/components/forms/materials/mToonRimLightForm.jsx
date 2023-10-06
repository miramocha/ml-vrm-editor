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
        <Form.Label>Rim Lighting Mix</Form.Label>
        <Form.Control
          type="number"
          name="_RimLightingMix"
          defaultValue={materialModel?.getValue('_RimLightingMix')}
          max={1}
          min={0}
          step={0.00001}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Rim Lift</Form.Label>
        <Form.Control
          type="number"
          name="_RimLift"
          defaultValue={materialModel?.getValue('_RimLift')}
          max={1}
          min={0}
          step={0.00001}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Rim Fresnel Power</Form.Label>
        <Form.Control
          type="number"
          name="_RimFresnelPower"
          defaultValue={materialModel?.getValue('_RimFresnelPower')}
          max={100}
          min={0}
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
