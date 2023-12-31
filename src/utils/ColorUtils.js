export const hexToColorUIVector = (hex) => {
  let r = 0;
  let g = 0;
  let b = 0;

  if (hex.length === 4) {
    r = `0x${hex[1]}${hex[1]}`;
    g = `0x${hex[2]}${hex[2]}`;
    b = `0x${hex[3]}${hex[3]}`;
  } else if (hex.length === 7) {
    r = `0x${hex[1]}${hex[2]}`;
    g = `0x${hex[3]}${hex[4]}`;
    b = `0x${hex[5]}${hex[6]}`;
  }

  const colorUIVector = [
    Number((r / 255).toFixed(5)),
    Number((g / 255).toFixed(5)),
    Number((b / 255).toFixed(5)),
  ];

  return colorUIVector;
};

export const colorUIVectorToHex = (rgbVector) => {
  const [r, g, b] = rgbVector;

  return [
    '#',
    Math.round(r * 255)
      .toString(16)
      .padStart(2, '0'),
    Math.round(g * 255)
      .toString(16)
      .padStart(2, '0'),
    Math.round(b * 255)
      .toString(16)
      .padStart(2, '0'),
  ].join('');
};
