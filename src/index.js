import merge from './merge';
import build from './build';
import flatMap from './flatMap';
import inflate from './inflate';

const Options = function (schema, ops = {}) {
  const required = build(schema, ops.dieHard, this);
  // Object.assign(this, output);
  Object.defineProperty(this, '__schema', {
    enumerable: false,
    value: schema
  });
  Object.defineProperty(this, '__private', {
    enumerable: false,
    value: {
      required,
      dieHard: ops.dieHard
    }
  });
};

Options.prototype.merge = function (...input) {
  merge(this.__schema, this.__private.dieHard, this, input);
  return this;
};

Options.prototype.copy = function () {
  return new Options(this.__schema).merge(this);
};

Options.prototype.flat = function (mapFunc) {
  const [result, map] = flatMap(this.__schema, mapFunc);
  return [result, inflate(map)];
};

export default Options;
