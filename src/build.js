import { isObj } from './getType';
import OptionsError from './errors/OptionsError';
import parseSchema from './parseSchema';

const build = (_schema, dieHard, buildTo) => {
  if (!dieHard && !isObj(_schema)) throw new OptionsError(_schema, undefined, '[Schema]', 'BuildType');
  const b = (schema, output, path, required) => {
    Object.keys(schema).forEach((key) => {
      if (key === '_parent' || key === '_property') return;
      const option = schema[key];
      const newPath = [...path, key];
      if (!dieHard) parseSchema(option, newPath);
      if (option._parent) {
        output[key] = {};
        b(option, output[key], newPath, required);
      } else {
        output[key] = option.default;
        if (option.required) required.push(newPath);
      }
    });
    return required;
  };
  return b(_schema, buildTo, ['[Schema]'], []);
};

export default build;
