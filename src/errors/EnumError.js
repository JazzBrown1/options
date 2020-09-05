import { getType } from '../getType';

function EnumError(option, value, path) {
  const inputType = getType(value);
  const expectedValues = option.enum;
  const message = `Failed to parse property ${path.join('.')}, must be one of the following values ${option.enum.toString()}`;
  const instance = new Error(message);
  instance.name = 'EnumError';
  instance.propertyKey = path[path.length - 1];
  instance.propertyPath = path;
  instance.inputType = inputType;
  instance.inputValue = value;
  instance.expectedValues = expectedValues;
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, EnumError);
  }
  return instance;
}

EnumError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

Object.setPrototypeOf(EnumError, Error);

export default EnumError;
