import PropTypes from 'prop-types';
import { Form, Stack, InputGroup } from 'react-bootstrap';
import RgbaInput from '../rgbaInput';
import MaterialModel from '../../models/MaterialModel';

export default function MToonMainForm({ materialModel }) {
  return (
    <Stack gap={2} className="mx-auto">
      <InputGroup>
        <Form.Label>Color</Form.Label>
        <RgbaInput
          name="_Color"
          defaultColorHex={materialModel?.getValue('_Color').hex}
          defaultAlpha={materialModel?.getValue('_Color').alpha}
        />
      </InputGroup>
    </Stack>
  );
}

MToonMainForm.propTypes = {
  materialModel: PropTypes.instanceOf(MaterialModel),
};
MToonMainForm.defaultProps = {
  materialModel: null,
};
