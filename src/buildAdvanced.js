import { typeError } from './errorMessages';
import { getType, isObj } from './getType';
import parseOption from './parseOption';

const parseSchemaObj = (obj) => {
  if (getType(obj) !== 'object') return false;
  if (obj.types === 'parent' && isObj(obj.children)) return true;
  if (getType(obj.types) === 'string') return true;
  if (getType(obj.types) === 'array') return true;
  return false;
};

const buildAdvanced = (_schema) => {
  const b = (schema, output, path, required, flat, flatRef) => {
    Object.keys(schema).forEach((key) => {
      const option = schema[key];
      const newPath = [...path, key];
      if (!option.types) {
        output[key] = {};
        b(option, output[key], newPath, required, flat, flatRef);
      } else {
        if (!parseSchemaObj(option)) throw new Error('Unable to parse Schema object, check syntax');
        if (option.default && !parseOption(option, option.default)) { throw new Error(typeError(path, key, schema)); }
        output[key] = option.default;
        if (option.required) required.push(newPath);
        const name = option.name || newPath.join('>');
        flat.push({ ...option, name });
        flatRef[name] = newPath;
      }
    });
    return {
      output, required, flat, flatRef
    };
  };
  return b(_schema, {}, [], [], [], {});
};

export default buildAdvanced;
