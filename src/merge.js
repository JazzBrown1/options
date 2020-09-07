import parseInput from './parseInput';
import { isObj } from './getType';
import OptionsError from './errors/OptionsError';

// first object (input) is not parsed
const mergeCore = (_schema, _current = {}, _input = {}, dieHard) => {
  if (!dieHard && !isObj(_input)) throw new OptionsError(_schema, _input, '[Options]', 'MergeType');
  const m = (schema, current, input, path) => {
    Object.keys(input).forEach((key) => {
      const value = input[key];
      const option = schema[key];
      const newPath = [...path, key];
      if (!option) throw new OptionsError(option, value, newPath, 'UnknownProp');
      if (option._parent) {
        if (!dieHard && !isObj(value)) throw new OptionsError(option, value, newPath, 'ParentType');
        m(option, current[key], value || {}, newPath);
      } else if (option._property) {
        if (!dieHard) parseInput(option, value, newPath);
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
