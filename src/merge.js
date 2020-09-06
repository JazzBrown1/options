import parseOption from './parseOption';
import { isObj } from './getType';
import UnknownPropertyError from './errors/UnknownPropertyError';
import InvalidParentTypeError from './errors/InvalidParentTypeError';

// first object (input) is not parsed
const mergeCore = (_schema, _current = {}, _input = {}, dieHard) => {
  if (!dieHard && !isObj(_input)) throw new TypeError('options.merge() input must be an object');
  const m = (schema, current, input, path) => {
    Object.keys(input).forEach((key) => {
      const value = input[key];
      const option = schema[key];
      const newPath = [...path, key];
      if (!option) throw new UnknownPropertyError(value, newPath);
      if (option._parent) {
        // if (!current[key]) current[key] = {}; // Currently redundant
        if (!dieHard && !isObj(value)) throw new InvalidParentTypeError(value, newPath);
        m(option, current[key], value || {}, newPath);
      } else if (option._property) {
        if (!dieHard) parseOption(option, value, newPath);
        current[key] = value;
      }
    });
    return current;
  };
  return m(_schema, _current, _input, ['[Options]']);
};

const merge = function (schema, dieHard, current, inputs) {
  inputs.forEach((input) => {
    mergeCore(schema, current, input, dieHard);
  });
  return current;
};

export default merge;
