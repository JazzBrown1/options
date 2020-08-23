/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-var */
/* eslint-disable no-undef */

var assert = require('assert');
var Options = require('../dist/main');

describe('Options()', function () {
  it('Able to create new option object passing valid schema', function () {
    const mySchema = {
      someOption: {
        types: ['string'],
        default: 'Some random text',
        cli: {
          name: '',
          alias: '',
        }
      },
      someParent: {
        types: 'parent',
        children: {
          someNestedOption: {
            types: ['number'],
            default: 1,
          },
        },
      },
    };

    const myOptions = new Options(mySchema);
  });
  it('Able to create new option object passing valid schema', function () {
    const mySchema = {
      someOption: {
        types: ['string'],
        default: 'Some random text'
      },
      someParent: {
        types: 'parent',
        children: {
          someNestedOption: {
            types: ['number'],
            default: 1
          },
        },
      },
    };

    const myOptions = new Options(mySchema);

    myOptions.merge(jsonFile);

    const someLibraryMethod = (overrides) => {
      tempOptions = myOptions.copy().merge(overrides);
      assert.equal(tempOptions.someParent.someNestedOption, 10);
    };

    const someOverrides = { someOption: 'test', someParent: { someNestedOption: 10 } };
    someLibraryMethod(someOverrides);
  });
});
