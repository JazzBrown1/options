import merge from './merge';
import build from './build';
import flatMap from './flatMap';
import inflate from './inflate';

const Options = function (schema) {
  const {
    output, required
  } = build(schema);
  Object.assign(this, output);
  Object.defineProperty(this, '__schema', {
    enumerable: false,
    value: schema
  });
  Object.defineProperty(this, '__required', {
    enumerable: false,
    value: required
  });
};

Options.prototype.merge = function (...args) {
  merge(this.__schema, this, ...args);
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
