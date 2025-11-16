const keyChecker = {
  50: 950,
  100: 900,
  200: 800,
  300: 700,
  400: 600,
  500: 500,
  600: 400,
  700: 300,
  800: 200,
  900: 100,
  950: 50,
};
function darkGenerator(light) {
  let dark = {};
  Object.entries(light).forEach(([key, value]) => {
    dark[keyChecker[key]] = value;
  });
  return dark;
}

module.exports = darkGenerator;
