import PropTypes from 'prop-types';
import { Form, Stack } from 'react-bootstrap';
import RgbaInput from '../../rgbaInput';
import MaterialModel from '../../../models/MaterialModel';

export default function MToonEmissionForm({ materialModel }) {
  return (
    <Stack gap={2} className="mx-auto">
      <Form.Group>
        <Form.Label>Emission Color</Form.Label>
        <RgbaInput
          name="_EmissionColor"
          defaultColorHex={materialModel?.getValue('_EmissionColor').hex}
          defaultAlpha={materialModel?.getValue('_EmissionColor').alpha}
        />
      </Form.Group>
    </Stack>
  );
}

MToonEmissionForm.propTypes = {
  materialModel: PropTypes.instanceOf(MaterialModel),
};
MToonEmissionForm.defaultProps = {
  materialModel: null,
};
