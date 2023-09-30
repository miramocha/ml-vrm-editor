import PropTypes from 'prop-types';
import { Form, Stack, InputGroup } from 'react-bootstrap';
import RgbaInput from '../rgbaInput';
import MaterialModel from '../../models/MaterialModel';

export default function MToonOutlineForm({ materialModel }) {
  return (
    <Stack gap={2} className="mx-auto">
      <Form.Label>Outline Color</Form.Label>
      <InputGroup>
        <RgbaInput
          name="_Shade"
          defaultColorHex={materialModel?.outlineColor.colorHex}
          defaultAlpha={materialModel?.outlineColor.alpha}
        />
      </InputGroup>
    </Stack>
  );
}

MToonOutlineForm.propTypes = {
  materialModel: PropTypes.instanceOf(MaterialModel),
};
MToonOutlineForm.defaultProps = {
  materialModel: null,
};
