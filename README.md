# Options

Manage, parse update and merge option objects

### Table of contents

1. [ Installation](#Install)
2. [ Usage](#usage)
3. [ Workflow](#workflow)
4. [ Report Bug](#bugs)

<a name="Install"></a>

## Installation

### Installing

```
npm install options
```
<a name="Install"></a>

## Usage

### Importing

Cjs

```
const options = require('options');
```

Es Module

```
import options from 'options';
```

### Example

```
const mySchema = {
  someOption: {
    type: ["text"],
    default: "Some random text",
  },
  someParent: {
    type: "parent",
    children: {
      someNestedOption: {
        type: ["number"],
        default: 1,
      },
    },
  },
};

const myOptions = new Options(mySchema);

jsonFile = {};

cliInput = {};

myOptions.update(jsonFile, cliInput);

someLibraryMethod = (overides) => {
  tempOptions = myOptions.copy(overides);
  myOptions.hasDefaults(tempOptions);
};
```

<a name="bugs"></a>

## Issues

If you encounter any issues please report them on the Library's [Github](https://github.com/JazzBrown1/options/issues).
