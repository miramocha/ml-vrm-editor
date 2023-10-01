import PropTypes from 'prop-types';
import { InputGroup, Form } from 'react-bootstrap';

export default function RgbaInput({ name, defaultColorHex, defaultAlpha }) {
  return (
    <InputGroup>
      <InputGroup.Text>Color</InputGroup.Text>
      <Form.Control
        name={`${name}ColorHex`}
        type="color"
        key={`${name}-${defaultColorHex}`}
        defaultValue={defaultColorHex}
      />
      <InputGroup.Text>Alpha</InputGroup.Text>
      <Form.Control
        name={`${name}Alpha`}
        type="number"
        key={`${name}-${defaultAlpha}`}
        defaultValue={defaultAlpha}
        step={0.01}
        min={0}
        max={1}
      />
    </InputGroup>
  );
}

RgbaInput.propTypes = {
  name: PropTypes.string,
  defaultColorHex: PropTypes.string,
  defaultAlpha: PropTypes.number,
};
RgbaInput.defaultProps = {
  name: null,
  defaultColorHex: '#FFFFFF',
  defaultAlpha: 1.0,
};
