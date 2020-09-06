# EZ-Options

Complex Options Objects made easy.

### Table of contents

1. [ Installation](#Install)
2. [ Usage](#usage)
3. [ Report Bug](#bugs)

<a name="Install"></a>

## Installation

### Installing

```
npm install ez-options
```
<a name="Install"></a>

## Usage

### Importing

Cjs

```
const Options = require('ez-options');
```

Es Module

```
import Options from 'ez-options';
```

### Example

- Basic Example

```javascript
const _property = true;
const _parent = true;

const schema = {
  reverse: { _property, types: ['boolean'], default: false, },
  separator: { _property, types: ['string'], default: ' ', },
  case: {
    _parent,
    upper: { _property, types: ['boolean'], default: false, },
    lower: { _property, types: ['boolean'], default: false, },
  }
};

class Person {
  constructor(firstName, lastName, userOptions = {}) {
    // Create options instance with schema
    this.options = new Options(schema);
    // Merge user input options
    this.options.merge(userOptions);
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getName(overrides = {}) {
    // Copy options object and merge overrides to the copy
    const temp = this.options.copy().merge(overrides);
    let text = temp.reverse
      ? `${this.lastName}${temp.separator}${this.firstName}`
      : `${this.firstName}${temp.separator}${this.lastName}`;
    if (temp.case.upper) text = text.toUpperCase();
    if (temp.case.lower) text = text.toLowerCase();
    return text;
  }
}

const john = new Person('John', 'Smith', { case: { upper: true } });
console.log(john.getName()); // 'JOHN SMITH'
console.log(john.getName({ reverse: true })); // 'SMITH JOHN'
console.log(john.getName({ reverse: true, separator: ', ', case: { upper: false } })); // 'Smith, John'
```
- Integration commandLineArgs lib

```javascript
const schema = {
  server: {
    _parent,
    compress: {
      _property, default: true, types: ['boolean'], cla: { name: 'compress', type: Boolean, alias: 'c' }
    },
    skip: {
      _property, default: false, types: ['boolean'], cla: { name: 'skip-server', type: Boolean, alias: 's' }
    },
  },
  react: {
    _parent,
    skip: {
      _property, default: false, types: ['boolean'], cla: { name: 'skip-react', type: Boolean, alias: 'r' }
    }
  },
  output: {
    _parent,
    directory: {
      _property, default: 'clasp', types: ['string'], cla: { name: 'output-directory', type: String, alias: 'o' }
    }
  }
};
// Create options instance with schema
const options = new Options(schema);
// Get the config.json object
const config = await getConfigJson();
// Extract the cla information into a flat array for commandLineArgs and an inflate function
const [claDefs, inflate] = options.flat((el) => [el.cla.name, el.cla]);
// Pass the extracted information to the commandLineArgs lib to get the command input options
const claFlat = commandLineArgs(claDefs);
// Inflate the flat object to the options object format
const claInflated = inflate(claFlat);
// Merge the user options into the Options instance
options.merge(config, claInflated);
```

<a name="bugs"></a>

## Issues

If you encounter any issues please report them on the Library's [Github](https://github.com/JazzBrown1/options/issues).
