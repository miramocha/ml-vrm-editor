import PropTypes from 'prop-types';
import { Form, Stack, InputGroup } from 'react-bootstrap';
import RgbaInput from '../rgbaInput';
import MaterialModel from '../../models/MaterialModel';

export default function MToonShadingForm({ materialModel }) {
  return (
    <Stack gap={2} className="mx-auto">
      <Form.Label>Shade Color</Form.Label>
      <InputGroup>
        <RgbaInput
          name="_Shade"
          defaultColorHex={materialModel?.shadeColor.colorHex}
          defaultAlpha={materialModel?.shadeColor.alpha}
        />
      </InputGroup>
    </Stack>
  );
}

MToonShadingForm.propTypes = {
  materialModel: PropTypes.instanceOf(MaterialModel),
};
MToonShadingForm.defaultProps = {
  materialModel: null,
};
