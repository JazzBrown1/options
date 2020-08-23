import { unknownError, typeError } from './errorMessages';
import parseOption from './parseOption';

// first object (input) is not parsed
const mergeTrusted = (_schema, input = {}, input2 = {}) => {
  const m = (schema, output, overrides, path) => {
    Object.keys(overrides).forEach((key) => {
      if (!schema[key]) throw new Error(unknownError(path, key, schema));
      if (!schema[key].types) {
        if (!output[key]) output[key] = {};
        m(schema[key], output[key], overrides[key] || {}, [
          ...path,
          key,
        ]);
      } else if (overrides[key]) {
        if (!parseOption(schema[key], overrides[key])) { throw new Error(typeError(path, key, schema)); }
        output[key] = overrides[key];
      }
    });
    return output;
  };
  return m(_schema, input, input2, []);
};

const mergeManyTrusted = function (...args) {
  const objs = [...args];
  const schema = objs.shift();
  const current = objs.shift();
  objs.forEach((obj) => {
    mergeTrusted(schema, current, obj);
  });
  return current;
};

export { mergeTrusted, mergeManyTrusted };
