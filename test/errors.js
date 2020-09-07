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
          assert.equal(err.type, 'SchemaObject');
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
          assert.equal(err.type, 'SchemaObject');
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
          assert.equal(err.type, 'SchemaDefault');
          done();
        }
      });
      it('Throws error if checker fails to parse prop', function (done) {
        const schema = {
          parent: {
            _parent,
            someOption: {
              _property,
              types: ['string'],
              default: 'text',
              checker: () => false
            },
          }
        };
        try {
          // eslint-disable-next-line no-unused-vars
          const options = new Options(schema);
        } catch (err) {
          assert.equal(err.type, 'SchemaDefault');
          done();
        }
      });
      it('Throws error if non object passed as schema', function (done) {
        try {
          // eslint-disable-next-line no-unused-vars
          const options = new Options(null);
        } catch (err) {
          assert.equal(err.type, 'BuildType');
          done();
        }
      });
      it('Throws error if non function passed as checker', function (done) {
        try {
          // eslint-disable-next-line no-unused-vars
          const options = new Options({ option: { _property, checker: 'err' } });
        } catch (err) {
          assert.equal(err.type, 'SchemaChecker');
          done();
        }
      });
      it('Throws error if non array passed as enum', function (done) {
        try {
          // eslint-disable-next-line no-unused-vars
          const options = new Options({ option: { _property, enum: 'err' } });
        } catch (err) {
          assert.equal(err.type, 'SchemaEnum');
          done();
        }
      });
      it('Throws error if non array passed as types', function (done) {
        try {
          // eslint-disable-next-line no-unused-vars
          const options = new Options({ option: { _property, types: 'err' } });
        } catch (err) {
          assert.equal(err.type, 'SchemaTypes');
          done();
        }
      });
      it('Throws error if non object is parent child', function (done) {
        try {
          // eslint-disable-next-line no-unused-vars
          const options = new Options({ option: 'throws error' });
        } catch (err) {
          assert.equal(err.type, 'SchemaObject');
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
          assert.equal(err.type, 'UnknownProp');
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
          assert.equal(err.type, 'PropType');
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
          assert.equal(err.type, 'ParentType');
          done();
        }
      });
      it('Throws error if checker fails to parse prop', function (done) {
        const schema = {
          option: {
            _property,
            types: ['string'],
            default: 'text',
            checker: (val) => val === 'text'
          },

        };
        const options = new Options(schema);
        try {
          options.merge({ option: 'wont parse' });
        } catch (err) {
          assert.equal(err.type, 'PropChecker');
          done();
        }
      });
      it('Throws error if value not in enum list', function (done) {
        const schema = {
          option: {
            _property,
            enum: ['foo'],
            default: 'foo'
          },

        };
        const options = new Options(schema);
        try {
          options.merge({ option: 'bar' });
        } catch (err) {
          assert.equal(err.type, 'PropEnum');
          done();
        }
      });
      it('Throws error if non object passed for merge', function (done) {
        const options = new Options({ option: { _property, default: 'default' } });
        try {
          // eslint-disable-next-line no-unused-vars
          options.merge(['Should cause Error']);
        } catch (err) {
          assert.equal(err.type, 'MergeType');
          done();
        }
      });
    });
  });
});
