/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-var */
/* eslint-disable no-undef */

var assert = require('assert');
var Options = require('../dist/main');

const _parent = true; const
  _property = true;

describe('options.flat()', function () {
  it('fFlattens using default func and inflates correctly', function () {
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
    const [flat, inflate] = options.flat();
    assert.deepEqual(flat, [{
      _property: true,
      types: ['string'],
      default: 'Some random text',
      name: 'someOption'
    },
    {
      _property: true,
      types: ['number'],
      default: 1,
      name: 'someParent_someNestedOption'
    }]);
    const inflated = inflate({ someParent_someNestedOption: '2' });
    assert.deepEqual(inflated, { someParent: { someNestedOption: 2 } });
  });
  it('Map multiple props into inflated obj', function () {
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
        someNestedOption2: {
          _property,
          types: ['number'],
          default: num,
        },
      },
    };
    const options = new Options(schema);
    const [flat, inflate] = options.flat();
    assert.deepEqual(flat, [{
      _property: true,
      types: ['string'],
      default: 'Some random text',
      name: 'someOption'
    },
    {
      _property: true,
      types: ['number'],
      default: 1,
      name: 'someParent_someNestedOption'
    },
    {
      _property: true,
      types: ['number'],
      default: 1,
      name: 'someParent_someNestedOption2'
    }]);
    const inflated = inflate({ someParent_someNestedOption: 2, someParent_someNestedOption2: 2 });
    assert.deepEqual(inflated, { someParent: { someNestedOption: 2, someNestedOption2: 2 } });
  });
  it('Ignore unknown props when inflating', function () {
    const num = 1;
    const schema = {
      someParent: {
        _parent,
        someNestedOption: {
          _property,
          types: ['number'],
          default: num,
        },
      }
    };
    const options = new Options(schema);
    const [, inflate] = options.flat();
    const inflated = inflate({ someParent_someNestedOption: 2, someParent_someNestedOption2: 2 });
    assert.deepEqual(inflated, { someParent: { someNestedOption: 2 } });
  });
  it('Skips props if mapFunc returns false', function () {
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
          cli: true
        },
      },
    };
    const options = new Options(schema);
    const [flat, inflate] = options.flat((el, key, path) => {
      if (!el.cli) return false;
      const name = el.name || path.join('_');
      return [name, { ...el, name }];
    });
    assert.deepEqual(flat, [
      {
        _property: true,
        types: ['number'],
        default: 1,
        name: 'someParent_someNestedOption',
        cli: true
      }
    ]);
    const inflated = inflate({ someParent_someNestedOption: '2' });
    assert.deepEqual(inflated, { someParent: { someNestedOption: 2 } });
  });
});
