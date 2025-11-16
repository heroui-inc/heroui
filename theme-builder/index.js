const fs = require("fs");
const prompt = require("prompt-sync")();
const formatterAndGenerator = require("./formatter-and-generator");

async function main() {
  let themeNameInput = prompt("Enter theme name: ");
  while (!themeNameInput) {
    themeNameInput = prompt("Enter theme name: ");
  }

  let defaultColorInput = prompt("Enter default colors: ");
  while (!defaultColorInput) {
    defaultColorInput = prompt("Enter default colors: ");
  }

  let primaryColorInput = prompt("Enter primary HEX: ");
  while (!primaryColorInput) {
    primaryColorInput = prompt("Enter primary HEX: ");
  }

  let secondaryColorInput = prompt("Enter secondary HEX: ");
  while (!secondaryColorInput) {
    secondaryColorInput = prompt("Enter secondary HEX: ");
  }

  let successColorInput = prompt("Enter success HEX: ");
  while (!successColorInput) {
    successColorInput = prompt("Enter success HEX: ");
  }

  let warningColorInput = prompt("Enter warning HEX: ");
  while (!warningColorInput) {
    warningColorInput = prompt("Enter warning HEX: ");
  }

  let dangerColorInput = prompt("Enter danger HEX: ");
  while (!dangerColorInput) {
    dangerColorInput = prompt("Enter danger HEX: ");
  }

  const result = await formatterAndGenerator({
    defaultColor: defaultColorInput,
    primaryColor: primaryColorInput,
    secondaryColor: secondaryColorInput,
    successColor: successColorInput,
    warningColor: warningColorInput,
    dangerColor: dangerColorInput,
  });

  fs.writeFileSync(
    `${themeNameInput}-light.json`,
    JSON.stringify({ light: result.light })
  );
  fs.writeFileSync(
    `${themeNameInput}-dark.json`,
    JSON.stringify({ dark: result.dark })
  );
}

main();
