import { mergeManyTrusted } from './merge';
import buildAdvanced from './buildAdvanced';

const Options = function (schema) {
  const {
    output, required, flat, flatRef
  } = buildAdvanced(schema);
  Object.assign(this, output);
  Object.defineProperty(this, '__schema', {
    enumerable: false,
    value: schema
  });
  Object.defineProperty(this, '__flat', {
    enumerable: false,
    value: { flat, flatRef }
  });
  Object.defineProperty(this, '__required', {
    enumerable: false,
    value: required
  });
};

Options.prototype.merge = function (...args) {
  mergeManyTrusted(this.__schema, this, ...args);
  return this;
};

Options.prototype.copy = function () {
  return new Options(this.__schema).merge(this);
};

Options.prototype.flat = function () {
  return this.__flat.flat;
};

const add = (arra, obj, value) => {
  const arr = [...arra];
  const last = arr.pop();
  const root = arr.reduce((acc, cur) => {
    if (!acc[cur]) acc[cur] = {};
    return acc[cur];
  }, obj);
  root[last] = value;
};

Options.prototype.inflate = function (input) {
  const ref = this.__flat.flatRef;
  const obj = {};
  Object.entries(input).forEach(([key, val]) => {
    const path = ref[key];
    if (!path) return;
    add(path, obj, val);
  });
  return obj;
};

export default Options;
