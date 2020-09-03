import { isObj } from './getType';
import parseOption from './parseOption';
import SchemaParsingError from './errors/SchemaParsingError';

const build = (_schema) => {
  const b = (schema, output, path, required) => {
    if (!isObj(schema)) throw new SchemaParsingError(schema, path);
    Object.keys(schema).forEach((key) => {
      if (key === '_parent' || key === '_property') return;
      const option = schema[key];
      const newPath = [...path, key];
      if (option._parent) {
        output[key] = {};
        b(option, output[key], newPath, required);
      } else if (option._property) {
        if (option.default) parseOption(option, option.default, newPath, key);
        output[key] = option.default;
        if (option.required) required.push(newPath);
      } else throw new SchemaParsingError(option, newPath);
    });
    return {
      output, required
    };
  };
  return b(_schema, {}, ['[Options]'], []);
};

export default build;
