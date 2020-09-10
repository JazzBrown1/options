/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-var */
/* eslint-disable no-undef */

var assert = require('assert');
var Options = require('../dist/main');

const _parent = true; const
  _property = true;

describe('Options()', function () {
  describe('new Options()', function () {
    it('Able to create new option object passing valid schema', function () {
      const text = 'Some random text';
      const num = 1;
      const schema = {
        someOption: {
          _property,
          types: ['string'],
          default: text,
        },
        someParent: {
          _parent,
          someNestedOption: {
            _property,
            types: ['number'],
            default: num,
          },
        },
      };
      const options = new Options(schema);
      assert.equal(options.someOption, text);
      assert.equal(options.someParent.someNestedOption, num);
    });
  });
  describe('options.copy()', function () {
    it('Able to copy options and merge without effecting orginal object', function () {
      const schema = {

        someOption: {
          _property,
          types: ['string'],
          default: 'Some random text',
        },
        someParent: {
          _parent,
          someNestedOption: {
            _property,
            types: ['number'],
            default: 1,
          },
        },
      };

      const options = new Options(schema);

      const overrides = { someOption: 'test', someParent: { someNestedOption: 10 } };
      const tempOptions = options.copy().merge(overrides);
      assert.equal(options.someParent.someNestedOption, 1);
      assert.equal(tempOptions.someParent.someNestedOption, 10);
    });
    it('Copies config to copy', function () {
      const schema = {

        someOption: {
          _property,
          types: ['string'],
          default: 'Some random text',
        },
        propWithNoDefault: {
          _property
        },
        someParent: {
          _parent,
          someNestedOption: {
            _property,
            types: ['number'],
            default: 1,
          },
        },
      };

      const options = new Options(schema, { dieHardMerge: true });
      // eslint-disable-next-line no-unused-vars
      const tempOptions = options.copy().merge();
      assert.equal(options.__private.dieHardMerge, true);
    });
  });
  describe('options.merge()', function () {
    it('Able merge over option with a falsy value', function () {
      const schema = {
        test: {
          _property,
          types: ['boolean'],
          default: true,
        }
      };
      const options = new Options(schema);
      options.merge({ test: false });
      assert.equal(options.test, false);
    });
    it('parses input when parser defined', function () {
      const schema = {
        name: {
          _property,
          types: ['object', 'string'],
          default: 'no name',
          parser: (input) => (typeof input === 'string' ? input : `${input.first} ${input.last}`)
        }
      };
      const options = new Options(schema);
      assert.equal(options.name, 'no name');
      options.merge({ name: { first: 'John', last: 'Smith' } });
      assert.equal(options.name, 'John Smith');
    });
    it('does not parse when default is undefined', function () {
      const schema = {
        name: {
          _property,
          types: ['object', 'string'],
          parser: (input) => (typeof input === 'string' ? input : `${input.first} ${input.last}`)
        }
      };
      const options = new Options(schema);
      assert.equal(options.name, undefined);
      options.merge({ name: { first: 'John', last: 'Smith' } });
      assert.equal(options.name, 'John Smith');
    });
  });
});
