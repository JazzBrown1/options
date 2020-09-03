/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-var */
/* eslint-disable no-undef */

var assert = require('assert');
var Options = require('../dist/main');

const _parent = true; const
  _property = true;

describe('Errors', function () {
  describe('Options()', function () {
    describe('new Options()', function () {
      it('Throws error if _property not passed as prop', function (done) {
        const schema = {
          someOption: {
            types: ['string'],
            default: 'text',
          },
        };
        try {
          // eslint-disable-next-line no-unused-vars
          const options = new Options(schema);
        } catch (err) {
          assert.equal(err.name, 'SchemaParsingError');
          done();
        }
      });
      it('Throws error if _parent not passed as prop', function (done) {
        const schema = {
          someParent: {
            someNestedOption: {
              _property,
              types: ['number'],
              default: 1,
            },
          },
        };
        try {
          // eslint-disable-next-line no-unused-vars
          const options = new Options(schema);
        } catch (err) {
          assert.equal(err.name, 'SchemaParsingError');
          done();
        }
      });
      it('Throws error if default is not of correct type', function (done) {
        const schema = {
          someParent: {
            _parent,
            someNestedOption: {
              _property,
              types: ['number'],
              default: 'text',
            },
          },
        };
        try {
          // eslint-disable-next-line no-unused-vars
          const options = new Options(schema);
        } catch (err) {
          assert.equal(err.name, 'PropertyTypeError');
          done();
        }
      });
      it('Throws error if parser fails to parse prop', function (done) {
        const schema = {
          parent: {
            _parent,
            someOption: {
              _property,
              types: ['string'],
              default: 'text',
              parser: () => false
            },
          }
        };
        try {
          // eslint-disable-next-line no-unused-vars
          const options = new Options(schema);
        } catch (err) {
          assert.equal(err.name, 'PropertyParsingError');
          done();
        }
      });
    });
    describe('options.merge()', function () {
      it('Throws error if unknown prop is passed', function (done) {
        const schema = {
          someOption: {
            _property,
            types: ['string'],
            default: 'text',
          },
        };
        const options = new Options(schema);
        try {
          options.merge({ foo: 'bar' });
        } catch (err) {
          assert.equal(err.name, 'UnknownPropertyError');
          done();
        }
      });
      it('Throws error if wrong type prop is passed', function (done) {
        const schema = {
          someOption: {
            _property,
            types: ['string'],
            default: 'text',
          },
        };
        const options = new Options(schema);
        try {
          options.merge({ someOption: 1 });
        } catch (err) {
          assert.equal(err.name, 'PropertyTypeError');
          done();
        }
      });
      it('Throws error if a non object is passed and parent is expected', function (done) {
        const schema = {
          parent: {
            _parent,
            someOption: {
              _property,
              types: ['string'],
              default: 'text',
            },
          }
        };
        const options = new Options(schema);
        try {
          options.merge({ parent: 1 });
        } catch (err) {
          assert.equal(err.name, 'InvalidParentTypeError');
          done();
        }
      });
      it('Throws error if parser fails to parse prop', function (done) {
        const schema = {
          option: {
            _property,
            types: ['string'],
            default: 'text',
            parser: (val) => val === 'text'
          },

        };
        const options = new Options(schema);
        try {
          options.merge({ option: 'wont parse' });
        } catch (err) {
          assert.equal(err.name, 'PropertyParsingError');
          done();
        }
      });
    });
  });
});
