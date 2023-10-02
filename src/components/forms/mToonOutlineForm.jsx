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
          name="_Outline"
          defaultColorHex={materialModel?.outlineColor.colorHex}
          defaultAlpha={materialModel?.outlineColor.alpha}
        />
      </InputGroup>
      <Form.Group>
        <Form.Label>Outline Width</Form.Label>
        <Form.Control
          name="_OutlineWidth"
          type="number"
          defaultValue={materialModel?.outlineWidth}
          step={0.01}
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
