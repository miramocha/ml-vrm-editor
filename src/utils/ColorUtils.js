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
    Number(r / 255).toFixed(4),
    Number(g / 255).toFixed(4),
    Number(b / 255).toFixed(4),
  ];

  return colorUIVector;
};

export const colorUIVectorToHex = () => {};
