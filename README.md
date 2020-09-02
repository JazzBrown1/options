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
const Options = require('options');
```

Es Module

```
import Options from 'options';
```

### Example

```
const _parent = true,
  _property = true;

const schema = {
  rootLevelOption: {
    _property,
    types: ['string'],
    default: 'Some random text',
  },
  someParent: {
    _parent,
    nestedOption: {
      _property,
      types: ['number'],
      default: 1,
    },
  },
};

const options = new Options(schema);

const userOptions = { rootLevelOption: 'foo' };

options.merge(userOptions);

const someLibraryMethod = () => {
  const overrides = { rootLevelOption: 'bar' };
  const temp = options.copy().merge(overrides);
  console.log(options.rootLevelOption) // foo
  console.log(temp.rootLevelOption) // bar
};
```

<a name="bugs"></a>

## Issues

If you encounter any issues please report them on the Library's [Github](https://github.com/JazzBrown1/options/issues).
