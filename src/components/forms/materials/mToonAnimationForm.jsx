import PropTypes from 'prop-types';
import { Form, Stack } from 'react-bootstrap';
import MaterialModel from '../../../models/MaterialModel';

export default function MToonAnimationForm({ materialModel }) {
  return (
    <Stack gap={2} className="mx-auto">
      <Form.Group>
        <Form.Label>Scroll X</Form.Label>
        <Form.Control
          key={`_UvAnimScrollX.${materialModel?.getValue('_UvAnimScrollX')}`}
          type="number"
          step={0.001}
          name="_UvAnimScrollX"
          defaultValue={materialModel?.getValue('_UvAnimScrollX')}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Scroll Y</Form.Label>
        <Form.Control
          key={`_UvAnimScrollY.${materialModel?.getValue('_UvAnimScrollY')}`}
          type="number"
          step={0.001}
          name="_UvAnimScrollY"
          defaultValue={materialModel?.getValue('_UvAnimScrollY')}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Rotation</Form.Label>
        <Form.Control
          key={`_UvAnimRotation.${materialModel?.getValue('_UvAnimRotation')}`}
          type="number"
          step={0.001}
          name="_UvAnimRotation"
          defaultValue={materialModel?.getValue('_UvAnimRotation')}
        />
      </Form.Group>
    </Stack>
  );
}

MToonAnimationForm.propTypes = {
  materialModel: PropTypes.instanceOf(MaterialModel),
};
MToonAnimationForm.defaultProps = {
  materialModel: null,
};
