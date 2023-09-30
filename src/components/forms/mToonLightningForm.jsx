import PropTypes from 'prop-types';
import { Form, Stack } from 'react-bootstrap';
import MaterialModel from '../../models/MaterialModel';

export default function MToonLightningForm({ materialModel }) {
  return (
    <Stack gap={2} className="mx-auto">
      <Form.Group>
        <Form.Label>Light Color Attenuation</Form.Label>
        <Form.Control
          type="number"
          name="_LightColorAttenuation"
          defaultValue={materialModel?.lightColorAttunation}
          max={1}
          min={0}
          step={1}
        />
        <Form.Text>
          Set the influence of the light source color.
          <dl>
            <dt>
              <code>0</code>
            </dt>
            <dd>Affected by the light source color.</dd>
            <dt>
              <code>1</code>
            </dt>
            <dd>
              Not affected by the light source color. It only reflects the
              luminance of the light source color.
            </dd>
          </dl>
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Indirect Light Intensity</Form.Label>
        <Form.Control
          type="number"
          name="_IndirectLightIntensity"
          defaultValue={materialModel?.indirectLightIntensity}
          min={0}
          step={0.01}
        />
      </Form.Group>
    </Stack>
  );
}

MToonLightningForm.propTypes = {
  materialModel: PropTypes.instanceOf(MaterialModel),
};
MToonLightningForm.defaultProps = {
  materialModel: null,
};
