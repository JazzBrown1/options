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
        type: ['string'],
        default: 'Some random text',
        cli: {
          name: '',
          alias: '',
        }
      },
      someParent: {
        type: 'parent',
        children: {
          someNestedOption: {
            type: ['number'],
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
        type: ['string'],
        default: 'Some random text',
        cli: {
          name: '',
          alias: '',
        }
      },
      someParent: {
        type: 'parent',
        children: {
          someNestedOption: {
            type: ['number'],
            default: 1,
          },
        },
      },
    };

    const myOptions = new Options(mySchema);

    jsonFile = { someParent: { someNestedOption: 2 } };

    cliInput = { someParent: { someNestedOption: 5 } };

    myOptions.update(jsonFile, cliInput);

    const someLibraryMethod = (overrides) => {
      tempOptions = myOptions.copy(overrides);
      console.log(tempOptions);
      console.log(myOptions.get());
    };

    const someOverrides = { someOption: 'test', someParent: { someNestedOption: 10 } };
    someLibraryMethod(someOverrides);
  });
});
