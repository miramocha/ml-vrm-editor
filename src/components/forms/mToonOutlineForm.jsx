import PropTypes from 'prop-types';
import { Form, Stack, InputGroup } from 'react-bootstrap';
import RgbaInput from '../rgbaInput';
import MaterialModel from '../../models/MaterialModel';

export default function MToonOutlineForm({ materialModel }) {
  return (
    <Stack gap={2} className="mx-auto">
      <InputGroup>
        <Form.Label>Outline Color</Form.Label>
        <RgbaInput
          name="_OutlineColor"
          defaultColorHex={materialModel?.getValue('_OutlineColor').hex}
          defaultAlpha={materialModel?.getValue('_OutlineColor').alpha}
        />
      </InputGroup>
      <Form.Group>
        <Form.Label>Outline Width</Form.Label>
        <Form.Control
          name="_OutlineWidth"
          type="number"
          defaultValue={materialModel?.getValue('_OutlineWidth')}
          min={0}
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
