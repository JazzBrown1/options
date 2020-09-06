import { isObj } from './getType';
import parseOption from './parseOption';
import SchemaParsingError from './errors/SchemaParsingError';

const parseSchemaProp = (option, path, key) => {
  if (option.types && !Array.isArray(option.types)) throw new SchemaParsingError(option, path, 'types prop must be an array');
  if (option.enum && !Array.isArray(option.enum)) throw new SchemaParsingError(option, path, 'enum prop must be an array');
  if (option.parser && typeof option.parser !== 'function') throw new SchemaParsingError(option, path, 'parser prop must be an function');
  if (option.default) try { parseOption(option, option.default, path, key); } catch (err) { throw new SchemaParsingError(option, path, `Unable to parse default - ${err.message}`); }
};

const build = (_schema, dieHard, buildTo) => {
  const b = (schema, output, path, required) => {
    if (!dieHard && !isObj(schema)) throw new SchemaParsingError(schema, path);
    Object.keys(schema).forEach((key) => {
      if (key === '_parent' || key === '_property') return;
      const option = schema[key];
      const newPath = [...path, key];
      if (option._parent) {
        output[key] = {};
        b(option, output[key], newPath, required);
      } else if (option._property) {
        if (!dieHard) parseSchemaProp(option, newPath, key);
        output[key] = option.default;
        if (option.required) required.push(newPath);
      } else throw new SchemaParsingError(option, newPath);
    });
    return required;
  };
  return b(_schema, buildTo, ['[Schema]'], []);
};

export default build;
