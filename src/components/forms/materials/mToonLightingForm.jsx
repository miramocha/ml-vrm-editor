import PropTypes from 'prop-types';
import { Form, Stack } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import MaterialModel from '../../../models/MaterialModel';

export default function MToonLightingForm({ materialModel }) {
  return (
    <Stack gap={2} className="mx-auto">
      <Form.Group>
        <Form.Label>Light Color Attenuation</Form.Label>
        <Form.Control
          key={`_LightColorAttenuation.${materialModel?.getValue(
            '_LightColorAttenuation',
          )}`}
          type="number"
          name="_LightColorAttenuation"
          defaultValue={materialModel?.getValue('_LightColorAttenuation')}
          max={1}
          min={0}
          step={1}
        />
        <Form.Text>
          <Trans i18nKey="helpText.lightColorAttenuation">
            Set the influence of the light source color.0: Affected by the light
            source color.1: Not affected by the light source color. It only
            reflects the luminance of the light source color.
          </Trans>
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Indirect Light Intensity</Form.Label>
        <Form.Control
          key={`_IndirectLightIntensity.${materialModel?.getValue(
            '_IndirectLightIntensity',
          )}`}
          type="number"
          name="_IndirectLightIntensity"
          defaultValue={materialModel?.getValue('_IndirectLightIntensity')}
          max={1}
          min={0}
          step={0.001}
        />
      </Form.Group>
    </Stack>
  );
}

MToonLightingForm.propTypes = {
  materialModel: PropTypes.instanceOf(MaterialModel),
};
MToonLightingForm.defaultProps = {
  materialModel: null,
};
