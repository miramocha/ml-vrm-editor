import PropTypes from 'prop-types';
import { Form, Stack, InputGroup } from 'react-bootstrap';
import RgbaInput from '../../rgbaInput';
import MaterialModel from '../../../models/MaterialModel';

export default function MToonShadingForm({ materialModel }) {
  return (
    <Stack gap={2} className="mx-auto">
      <InputGroup>
        <Form.Label>Shade Color</Form.Label>
        <RgbaInput
          name="_ShadeColor"
          defaultColorHex={materialModel?.getValue('_ShadeColor').hex}
          defaultAlpha={materialModel?.getValue('_ShadeColor').alpha}
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
