import { getType } from '../getType';

function PropertyParsingError(option, value, path) {
  const inputType = getType(value);
  const message = `Failed to parse property ${path.join('.')}`;
  const instance = new Error(message);
  instance.name = 'PropertyParsingError';
  instance.propertyKey = path[path.length - 1];
  instance.propertyPath = path;
  instance.inputType = inputType;
  instance.inputValue = value;
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, PropertyParsingError);
  }
  return instance;
}

PropertyParsingError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

Object.setPrototypeOf(PropertyParsingError, Error);

export default PropertyParsingError;
