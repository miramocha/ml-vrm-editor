import PropTypes from 'prop-types';
import { Form, Stack } from 'react-bootstrap';
import RgbaInput from '../../rgbaInput';
import MaterialModel from '../../../models/MaterialModel';

export default function MToonOutlineForm({ materialModel }) {
  return (
    <Stack gap={2} className="mx-auto">
      <Form.Group>
        <Form.Label>Outline Color</Form.Label>
        <RgbaInput
          name="_OutlineColor"
          defaultColorHex={materialModel?.getValue('_OutlineColor').hex}
          defaultAlpha={materialModel?.getValue('_OutlineColor').alpha}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Outline Width</Form.Label>
        <Form.Control
          name="_OutlineWidth"
          type="number"
          defaultValue={materialModel?.getValue('_OutlineWidth')}
          min={0.01}
          max={1}
          step={0.00001}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Outline Scaled Max Distance</Form.Label>
        <Form.Control
          name="_OutlineScaledMaxDistance"
          type="number"
          defaultValue={materialModel?.getValue('_OutlineScaledMaxDistance')}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Outline Lightning Mix</Form.Label>
        <Form.Control
          name="_OutlineLightingMix"
          type="number"
          defaultValue={materialModel?.getValue('_OutlineLightingMix')}
          min={0}
          max={1}
          step={0.00001}
        />
      </Form.Group>
    </Stack>
  );
}

MToonOutlineForm.propTypes = {
  materialModel: PropTypes.instanceOf(MaterialModel),
};
MToonOutlineForm.defaultProps = {
  materialModel: null,
};
