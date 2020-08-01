/* eslint-disable max-len */

const getType = (x) => {
  const type = typeof x;
  if (type !== 'object') return type;
  if (x === null) return 'null';
  if (Array.isArray(x)) return 'array';
  return 'object';
};

const isObj = (x) => getType(x) === 'object';

const unknownError = (path, key) => `Unknown option ${path.join('.')}.${key}`;
const typeError = (path, key, schema) => `${path.join('.')}.${key} is of type ${getType(schema[key].default)}, must be of the following type/s: ${schema[key].type}`;

const parseOption = (option, input) => option.type.includes(getType(input));

const checkUnknowns = (schema, input = {}, path = []) => {
  Object.keys(input).forEach((key) => {
    if (schema[key] === undefined) throw new Error(unknownError(path, key));
    if (schema[key].type === 'child') checkUnknowns(schema[key].children, input[key], [...path, key]);
  });
  return input;
};

const merge = (_schema, input = {}, input2 = {}) => {
  const m = (schema, output, overrides, path) => {
    Object.keys(schema).forEach((key) => {
      if (schema[key].type === 'child') {
        if (!output[key]) output[key] = {};
        m(schema[key].children, output[key], overrides[key] || {}, [...path, key]);
      } else if (overrides[key]) {
        if (!parseOption(schema[key], overrides[key])) throw new Error(typeError(path, key, schema));
        output[key] = overrides[key];
      } else if (output[key]) {
        if (!parseOption(schema[key], output[key])) throw new Error(typeError(path, key, schema));
      } else {
        if (!parseOption(schema[key], schema[key].default)) throw new Error(typeError(path, key, schema));
        output[key] = schema[key].default;
      }
    });
    return output;
  };
  checkUnknowns(_schema, input);
  checkUnknowns(_schema, input2);
  return m(_schema, input, input2, []);
};

/*
const mergeSimple = (_schema, input) => {
  const m = (schema, output, path) => {
    Object.keys(schema).forEach((key) => {
      if (schema[key].type === 'child') {
        if (!output[key]) output[key] = {};
        m(schema[key].children, output[key], [...path, key]);
      } else if (output[key]) {
        if (!parseOption(schema[key], output[key])) throw new Error(typeError(path, key, schema));
      } else {
        if (!parseOption(schema[key], schema[key].default)) throw new Error(typeError(path, key, schema));
        output[key] = schema[key].default;
      }
    });
    return output;
  };
  return m(_schema, input, []);
};

const build = (_schema) => {
  const b = (schema, output, path) => {
    Object.keys(schema).forEach((key) => {
      if (schema[key].type === 'child') {
        output[key] = {};
        b(schema[key].children, output[key], [...path, key]);
      } else {
        if (!parseOption(schema[key], schema[key].default)) throw new Error(typeError(path, key, schema));
        output[key] = schema[key].default;
      }
    });
    return output;
  };
  return b(_schema, {}, []);
};

const mergeOld = (_schema, _input) => {
  const m = (schema, input, output, path) => {
    Object.keys(input).forEach((key) => {
      if (schema[key] === undefined) throw new Error(unknownError(path, key));
      if (isObj(schema[key]) && schema[key].type === 'child') {
        m(schema[key].children, input[key], output[key], [...path, key]);
      } else {
        if (!parseOption(schema[key], input[key])) throw new Error(typeError(path, key, schema));
        output[key] = input[key];
      }
    });
    return output;
  };
  return m(_schema, _input, build(_schema), []);
};

const parse = (schema, input) => {
  Object.keys(input).forEach((key) => {
    if (schema[key] === undefined) throw new Error(`Unknown option ${key}`);
    if (isObj(schema[key]) && schema[key].type === 'child') {
      parse(schema[key].children, input[key]);
    } else if (!parseOption(schema[key], input[key])) throw new Error(`${key} must be of the following type/s: ${schema[key].type} is of type ${getType(input[key])})}`);
  });
  return true;
};
*/
// eslint-disable-next-line import/prefer-default-export
export { merge };
