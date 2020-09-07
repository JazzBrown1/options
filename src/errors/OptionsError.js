import { getType } from '../getType';
import getErrorMessage from './errorMessages';

function OptionsError(option, input, path, type) {
  const message = getErrorMessage(option, input, path, type);
  const instance = new Error(message);
  instance.name = 'OptionsError';
  instance.type = type;
  instance.propertyKey = path[path.length - 1];
  instance.propertyPath = path;
  instance.inputType = input ? getType(input) : undefined;
  instance.inputValue = input;
  instance.schemaDefinition = option || 'n/a';
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, OptionsError);
  }
  return instance;
}

OptionsError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

Object.setPrototypeOf(OptionsError, Error);

export default OptionsError;
