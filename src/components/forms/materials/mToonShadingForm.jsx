import PropTypes from 'prop-types';
import { Form, Stack } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import RgbaInput from '../../rgbaInput';
import MaterialModel from '../../../models/MaterialModel';

export default function MToonShadingForm({ materialModel }) {
  return (
    <Stack gap={2} className="mx-auto">
      <Form.Group>
        <Form.Label>Shade Color</Form.Label>
        <RgbaInput
          name="_ShadeColor"
          defaultColorHex={materialModel?.getValue('_ShadeColor').hex}
          defaultAlpha={materialModel?.getValue('_ShadeColor').alpha}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Shadow Receive Multiplier</Form.Label>
        <Form.Control
          type="number"
          name="_ReceiveShadowRate"
          defaultValue={materialModel?.getValue('_ReceiveShadowRate')}
        />
        <Form.Text>
          <Trans i18nKey="helpText.shadowReceiveMultiplier">
            Set the influence of the self-shadow and shadow. 0: Not affected. 1:
            Affected.
          </Trans>
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Shading Shift</Form.Label>
        <Form.Control
          type="number"
          name="_ShadeShift"
          defaultValue={materialModel?.getValue('_ShadeShift')}
          step={0.00001}
          min={-1}
          max={1}
        />
        <Form.Text>
          <Trans i18nKey="helpText.shadeShift">
            Adjust the threshold value of the lit color and shade color for how
            the light ray hits the object.When the value is 0, it is the normal
            lighting.When the value is negative, it becomes the lighting with
            anime-like, wide range of lit color. It is necessary to disable the
            self-shadow with setting the value to 0 in Shadow Receive Multiplier
            according to the displayed warning message.
          </Trans>
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Shade Toony</Form.Label>
        <Form.Control
          type="number"
          name="_ShadeToony"
          defaultValue={materialModel?.getValue('_ShadeToony')}
          step={0.00001}
          min={0}
          max={1}
        />
        <Form.Text>
          <Trans i18nKey="helpText.shadeToony">
            Set whether to smoothly change the lit color and shade color around
            the threshold value in Shading Shift.When the value is 0, it becomes
            realistically smooth like a general Lambert model.When the value is
            1, it becomes animation-style lighting. The lit color and shade
            color change rapidly around the threshold value.
          </Trans>
        </Form.Text>
      </Form.Group>
    </Stack>
  );
}

MToonShadingForm.propTypes = {
  materialModel: PropTypes.instanceOf(MaterialModel),
};
MToonShadingForm.defaultProps = {
  materialModel: null,
};
