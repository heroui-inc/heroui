/* eslint-disable no-console */
const fs = require('fs');

const yaml = require('js-yaml');

// Function to read YAML file and retrieve a specific component
function getComponentFromYaml(filePath, componentName) {
  try {
    // Read the YAML file
    const yamlContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse the YAML content
    const parsedYaml = yaml.load(yamlContent);
    
    // Retrieve the specific component
    const component = parsedYaml.components[componentName];
    
    if (component) {
      // Convert the component back to a YAML string
      const componentYaml = yaml.dump({ [componentName]: component });
      
      // Log the component YAML string
      console.log(componentYaml);
    } else {
      console.log(`Component "${componentName}" not found in the YAML file.`);
    }
  } catch (err) {
    console.error('Error reading or processing the YAML file:', err);
  }
}

// Usage
const yamlFilePath = './openui-spec.yaml';
const componentName = 'accordion';

getComponentFromYaml(yamlFilePath, componentName);
