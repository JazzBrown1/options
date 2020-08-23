const Options = require('../dist/main');

const mySchema = {
  someOption: {
    types: ['string'],
    default: 'Some random text',
    type: String,
    name: 'some-option'
  },
  someParent: {
    cliOption: {
      types: ['string'],
      default: 'Some random text',
      type: String,
      name: 'cli-option'
    },
  },
};

console.log(Array(1));

const options = new Options(mySchema);

const claDefinitions = options.flat((key, data) => [data.name, data]);

console.log('definitions', claDefinitions);
const inflated = options.inflate({ 'cli-option': 'myyyyy test' });
console.log('inflated', inflated);
options.merge(inflated);
console.log(options);

// const claArguments = options.inflate(commandLineArguments(claDefinitions));

// options.merge(claArguments);

const update = {
  someOption: 'new'
};

options.merge(update);

console.log(options);

const opsCopy = options.copy();

const update2 = {
  someOption: 'copy'
};

opsCopy.merge(update2);

console.log(options);
console.log(opsCopy);
