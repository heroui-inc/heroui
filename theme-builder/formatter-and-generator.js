const shadesOf = require("./shades-gen");
const darkGenerator = require("./dark-gen");

function formatterAndGenerator({
  defaultColor,
  primaryColor,
  secondaryColor,
  successColor,
  warningColor,
  dangerColor,
}) {
  const lightColors = {
    default: {
      DEFAULT: defaultColor,
      ...shadesOf(defaultColor),
    },
    primary: {
      DEFAULT: primaryColor,
      ...shadesOf(primaryColor),
    },
    secondary: {
      DEFAULT: secondaryColor,
      ...shadesOf(secondaryColor),
    },
    success: {
      DEFAULT: successColor,
      ...shadesOf(successColor),
    },
    warning: {
      DEFAULT: warningColor,
      ...shadesOf(warningColor),
    },
    danger: {
      DEFAULT: dangerColor,
      ...shadesOf(dangerColor),
    },
  };

  const darkColors = {
    default: {
      DEFAULT: defaultColor,
      ...darkGenerator(shadesOf(defaultColor)),
    },
    primary: {
      DEFAULT: primaryColor,
      ...darkGenerator(shadesOf(primaryColor)),
    },
    secondary: {
      DEFAULT: secondaryColor,
      ...darkGenerator(shadesOf(secondaryColor)),
    },
    success: {
      DEFAULT: successColor,
      ...darkGenerator(shadesOf(successColor)),
    },
    warning: {
      DEFAULT: warningColor,
      ...darkGenerator(shadesOf(warningColor)),
    },
    danger: {
      DEFAULT: dangerColor,
      ...darkGenerator(shadesOf(dangerColor)),
    },
  };

  return {
    light: lightColors,
    dark: darkColors,
  };
}

module.exports = formatterAndGenerator;
