

## Overview

This scripts folder is meant to generate OpenUI spec file for HeroUI.

The OpenUI specification provides a standardized way to describe UI components across different libraries and frameworks. This makes it easier for AI models to understand component APIs and behavior.

## Project Structure

This project contains scripts to generate and work with OpenUI specifications:

### 1. Generate Full Spec (`gen-openui-spec.ts`)

Generates a complete YAML specification for all UI components:

```bash
npx tsx ./gen-openui-spec.ts
```

This creates `openui-spec.yaml` containing the full component specification.

### 2. Extract Single Component (`_get-component-from-yaml.ts`) 

Extracts a specific component's specification from the full YAML:

```bash
# Usage
npx tsx ./_get-component-from-yaml.ts 
```

This is particularly useful for:
- Getting focused documentation for a single component
- Reducing context size when working with AI tools
- Testing component specifications in isolation

## Specification Format

Components are specified in YAML format with standardized fields:

```yaml
name: ComponentName
package: '@namespace/component'
props:
  propName:
    type: string
    description: Description of the prop
    default: defaultValue
events:
  eventName:
    type: EventType
    description: Description of the event
```
