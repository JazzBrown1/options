import parseInput from './parseInput';
import { isObj } from './getType';
import OptionsError from './errors/OptionsError';

// first object (input) is not parsed
const mergeCore = (_schema, _current, _input, dieHard) => {
  const _path = ['[Options]'];
  if (!dieHard && !isObj(_input)) throw new OptionsError(_schema, _input, _path, 'MergeType');
  const m = (schema, current, input, path) => {
    Object.keys(input).forEach((key) => {
      const value = input[key];
      const option = schema[key];
      const newPath = dieHard || [...path, key];
      if (!option) throw new OptionsError(option, value, newPath, 'UnknownProp');
      if (option._parent) {
        if (!dieHard && !isObj(value)) throw new OptionsError(option, value, newPath, 'ParentType');
        m(option, current[key], value, newPath);
      } else {
        if (!dieHard) parseInput(option, value, newPath);
        current[key] = value;
      }
    });
    return current;
  };
  return m(_schema, _current, _input, _path);
};

const merge = function (schema, dieHard, current, inputs) {
  inputs.forEach((input) => {
    mergeCore(schema, current, input, dieHard);
  });
  return current;
};

export default merge;
