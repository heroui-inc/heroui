function shadesOf(hex) {
  const baseColor = hexToRgbArray(hex);
  const black = [0, 0, 0];
  const white = [255, 255, 255];

  let shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  let result = {};

  for (let shade of shades) {
    const originalShade = shade;

    if (shade === 500) {
      result[shade] = hex;
      continue;
    }

    let isDarkShade = shade > 500;
    if (isDarkShade) shade -= 500;

    const percentage = shade / 500;
    const startColor = isDarkShade ? black : baseColor;
    const endColor = isDarkShade ? baseColor : white;

    result[originalShade] = getColor(percentage, startColor, endColor);
  }

  return result;
}

function hexToRgbArray(hex) {
  const originalHex = hex;

  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex + hex;

  const r = hex.substring(0, 2);
  const g = hex.substring(2, 4);
  const b = hex.substring(4, 6);

  const rgb = [r, g, b].map((channel) => {
    try {
      channel = parseInt(channel, 16);
      if (channel < 0 || channel > 255) throw new Error();
      return channel;
    } catch {
      throw new Error(`Invalid hex color provided: ${originalHex}`);
    }
  });

  return rgb;
}

function getColor(percentage, start, end) {
  const rgb = end.map((channel, index) => {
    return Math.round(channel + percentage * (start[index] - channel));
  });

  const hex =
    "#" +
    rgb
      .map((channel) => {
        const component = channel.toString(16);
        if (component.length === 1) return "0" + component;
        return component;
      })
      .join("");
  return hex;
}

module.exports = shadesOf;
