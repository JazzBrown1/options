import { getType } from './getType';

const typeError = (path, key, schema) => `${path.join('.')}.${key} is of type ${getType(
  schema[key].default
)}, must be of the following type/s: ${schema[key].type}`;

const unknownError = (path, key) => `Unknown option ${path.join('.')}.${key}`;

export { typeError, unknownError };
