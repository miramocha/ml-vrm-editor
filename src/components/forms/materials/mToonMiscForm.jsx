import PropTypes from 'prop-types';
import { Form, Stack } from 'react-bootstrap';
import MaterialModel from '../../../models/MaterialModel';

export default function MToonMiscForm({ materialModel }) {
  return (
    <Stack gap={2} className="mx-auto">
      <Form.Group>
        <Form.Label>Render Queue</Form.Label>
        <Form.Control
          key={`renderQueue.${materialModel?.getValue('renderQueue')}`}
          type="number"
          name="renderQueue"
          step={1}
          defaultValue={materialModel?.getValue('renderQueue')}
        />
      </Form.Group>
    </Stack>
  );
}

MToonMiscForm.propTypes = {
  materialModel: PropTypes.instanceOf(MaterialModel),
};
MToonMiscForm.defaultProps = {
  materialModel: null,
};
