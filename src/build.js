import { isObj } from './getType';
import OptionsError from './errors/OptionsError';
import parseSchema from './parseSchema';

const build = (_schema, dieHard, buildTo) => {
  const _path = ['[Options]'];
  if (!dieHard && !isObj(_schema)) throw new OptionsError(_schema, undefined, _path, 'BuildType');
  const b = (schema, output, path) => {
    Object.keys(schema).forEach((key) => {
      if (key === '_parent' || key === '_property') return;
      const option = schema[key];
      const newPath = dieHard || [...path, key];
      if (!dieHard) parseSchema(option, newPath);
      if (option._parent) {
        output[key] = {};
        b(option, output[key], newPath);
      } else output[key] = option.default;
    });
  };
  return b(_schema, buildTo, _path);
};

export default build;
