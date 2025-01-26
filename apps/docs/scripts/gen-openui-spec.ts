#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// -----------------------------------------------------------------------------
// 1. CONFIGURATION
// -----------------------------------------------------------------------------
const MDX_FOLDER_PATH = "../content/docs/components"; // Folder containing your .mdx files
const OUTPUT_FOLDER_PATH = "./props-events-data"; // Where we'll put the output

// Add color constants at the top with other configurations
const COLORS = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  reset: "\x1b[0m"
};

// Create output folder if it doesn't exist
if (!fs.existsSync(OUTPUT_FOLDER_PATH)) {
  fs.mkdirSync(OUTPUT_FOLDER_PATH, { recursive: true });
}

// Regex to capture all <APITable data={...}> blocks.
// Explanation:
// - `<APITable\s+data=` looks for the starting tag with a `data` prop.
// - `\{(\[[\s\S]*?\])\}` captures the bracket contents inside data={ ... } as group 1.
//   We use `[\s\S]*?` to match everything (including newlines) in a lazy way until the first closing ].
const APITABLE_REGEX = /<APITable[\s\S]*?data=\{\s*(\[[\s\S]*?\])\s*\}[\s\S]*?(?:\/>|>\s*<\/APITable>)/g;

// -----------------------------------------------------------------------------
// 2. MAIN LOGIC
// -----------------------------------------------------------------------------
function main() {
  // Read all files in MDX_FOLDER_PATH
  const mdxFiles = fs
    .readdirSync(MDX_FOLDER_PATH)
    .filter((file) => file.endsWith(".mdx"));

  if (mdxFiles.length === 0) {
    console.log(COLORS.red + "No .mdx files found in:" + COLORS.reset, MDX_FOLDER_PATH);

    return;
  }

  mdxFiles.forEach((filename) => {
    // Derive the component name from the .mdx filename (remove extension).
    // e.g. "chip.mdx" => "chip"
    const componentName = path.basename(filename, ".mdx");

    console.log(
      `\n${COLORS.green}Processing file: ${filename}, component: ${componentName}${COLORS.reset}`
    );

    const filePath = path.join(MDX_FOLDER_PATH, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Find all <APITable data={...} />
    const matches = [...fileContent.matchAll(APITABLE_REGEX)];

    if (matches.length === 0) {
      console.log(
        `${COLORS.red}No <APITable> blocks found in ${filename}. Skipping...${COLORS.reset}`
      );

      return;
    }

    // We expect two APITable blocks: first for Props, second for Events
    // (based on your description). But let's be flexible and check how many we got.
    if (matches.length < 2) {
      console.log(
        `${COLORS.red}Found only ${matches.length} <APITable> in ${filename}. Expected 2.${COLORS.reset}`
      );
    }

    // 1st match => Props data
    // 2nd match => Events data
    const [propsMatch, eventsMatch] = matches;

    // Parse the data arrays.
    // We'll define a helper to parse the string into a real JavaScript array/object:
    function parseDataArray(str) {
      // Because the data block uses valid JS object/array syntax, we can parse it via eval
      // after wrapping in parentheses so it's treated as an expression.
      try {
        return eval("(" + str + ")");
      } catch (err) {
        console.error(
          `${COLORS.red}Failed to parse data array:\n${str}\n${err}${COLORS.reset}`
        );

        return null;
      }
    }

    // Extract the text from capturing group 1: the array portion
    const propsDataString = propsMatch?.[1];
    const eventsDataString = eventsMatch?.[1];

    const propsData = propsDataString ? parseDataArray(propsDataString) : null;
    const eventsData = eventsDataString ? parseDataArray(eventsDataString) : null;

    // Prepare output folder for this component
    const componentOutputPath = path.join(OUTPUT_FOLDER_PATH, componentName);

    if (!fs.existsSync(componentOutputPath)) {
      fs.mkdirSync(componentOutputPath, { recursive: true });
    }

    // Write props.json
    if (propsData) {
      fs.writeFileSync(
        path.join(componentOutputPath, "props.json"),
        JSON.stringify(propsData, null, 2),
        "utf8"
      );
      console.log(`${COLORS.green}Created: ${componentName}/props.json${COLORS.reset}`);
    } else {
      console.log(`${COLORS.red}No props data found in ${filename}.${COLORS.reset}`);
    }

    // Write events.json
    if (eventsData) {
      fs.writeFileSync(
        path.join(componentOutputPath, "events.json"),
        JSON.stringify(eventsData, null, 2),
        "utf8"
      );
      console.log(`${COLORS.green}Created: ${componentName}/events.json${COLORS.reset}`);
    } else {
      console.log(`${COLORS.red}No events data found in ${filename}.${COLORS.reset}`);
    }
  });
}

// -----------------------------------------------------------------------------
// 3. RUN
// -----------------------------------------------------------------------------
main();
