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

jsonInput = {someOption: 'foo'};

myOptions.merge(jsonFile);

someLibraryMethod = () => {
  const overrides(someOption: 'bar')
  const tempOptions = myOptions.copy().merge(overrides);
  console.log(myOptions.someOption) // foo
  console.log(tempOptions.someOption) // bar
};
```

<a name="bugs"></a>

## Issues

If you encounter any issues please report them on the Library's [Github](https://github.com/JazzBrown1/options/issues).
