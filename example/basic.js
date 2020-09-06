const Options = require('..');

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
