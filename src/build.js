import { isObj } from './getType';
import OptionsError from './errors/OptionsError';
import checkSchema from './checkSchema';

const shouldParse = (option) => option.parser && typeof option.default !== 'undefined';

const build = (_schema, dieHard, buildTo) => {
  const _path = ['[Options]'];
  if (!dieHard && !isObj(_schema)) throw new OptionsError(_schema, undefined, _path, 'BuildType');
  const b = (schema, output, path) => {
    Object.keys(schema).forEach((key) => {
      if (key === '_parent' || key === '_property') return;
      const option = schema[key];
      const newPath = dieHard || [...path, key];
      if (!dieHard) checkSchema(option, newPath);
      if (option._parent) {
        output[key] = {};
        b(option, output[key], newPath);
      } else output[key] = shouldParse(option) ? option.parser(option.default) : option.default;
    });
  };
  return b(_schema, buildTo, _path);
};

export default build;
