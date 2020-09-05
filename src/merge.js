import parseOption from './parseOption';
import { isObj } from './getType';
import UnknownPropertyError from './errors/UnknownPropertyError';
import InvalidParentTypeError from './errors/InvalidParentTypeError';

// first object (input) is not parsed
const mergeCore = (_schema, input = {}, input2 = {}) => {
  if (!isObj(input2)) throw new TypeError('options.merge() input must be an object');
  const m = (schema, output, overrides, path) => {
    Object.keys(overrides).forEach((key) => {
      const value = overrides[key];
      const option = schema[key];
      const newPath = [...path, key];
      if (!option) throw new UnknownPropertyError(value, newPath);
      if (option._parent) {
        // if (!output[key]) output[key] = {}; // Currently redundant
        if (!isObj(value)) throw new InvalidParentTypeError(value, newPath);
        m(option, output[key], value || {}, newPath);
      } else if (option._property) {
        parseOption(option, value, newPath);
        output[key] = value;
      }
    });
    return output;
  };
  return m(_schema, input, input2, ['[Options]']);
};

const merge = function (...args) {
  const objs = [...args];
  const schema = objs.shift();
  const current = objs.shift();
  objs.forEach((obj) => {
    mergeCore(schema, current, obj);
  });
  return current;
};

export default merge;
