const Options = require('../dist/main');

const _parent = true;
const _property = _parent;

const mySchema = {
  cliOption: {
    _property,
    default: 'Some random text',
    types: ['number'],
    parser: (input) => typeof input === 'string',
    cli: {
      name: 'cli-option',
      type: String,
      alias: 'c'
    }
  },
  someParent: {
    _parent,
    cliOption: {
      _property,
      types: ['string'],
      default: 'Some random text',
      cli: {
        type: String,
        name: 'nested-cli-option',
        alias: 'n'
      }
    },
  },
};

try {
  const options = new Options(mySchema);
} catch (err) {
  console.log('test', err instanceof Error);
  throw err;
}

const [claDefinitions, inflate] = options.flat(({ cli }) => [cli.name, cli]);

const inflated = inflate({ 'cli-option': 'my test', 'nested-cli-option': 'my test' });

console.log('definitions', claDefinitions);
console.log('inflated', inflated);

const update = {
  cliOption: 'haha'
};

options.merge(inflated, update);

console.log(options);

const opsCopy = options.copy();

const update2 = {
  cliOption: 'copy'
};

opsCopy.merge(update2);

console.log(options);
console.log(opsCopy);
