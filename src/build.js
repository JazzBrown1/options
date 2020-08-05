import { typeError } from './errorMessages';
import { getType, isObj } from './getType';
import { parseOption } from './merge';

const parseSchemaObj = (obj) => {
  if (getType(obj) !== 'object') return false;
  if (obj.type === 'parent' && isObj(obj.children)) return true;
  if (getType(obj.type) === 'array' && obj.default) return true;
  return false;
};
const build = (_schema) => {
  const b = (schema, output, path) => {
    Object.keys(schema).forEach((key) => {
      if (!parseSchemaObj(schema[key])) throw new Error();
      if (schema[key].type === 'parent') {
        output[key] = {};
        b(schema[key].children, output[key], [...path, key]);
      } else {
        if (!parseOption(schema[key], schema[key].default)) { throw new Error(typeError(path, key, schema)); }
        output[key] = schema[key].default;
      }
    });
    return output;
  };
  return b(_schema, {}, []);
};

export default build;
