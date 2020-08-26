import { getType } from '../getType';

function PropertyParsingError(option, value, path) {
  const inputType = getType(value);
  const expectedTypes = option.types;
  const message = `Failed to parse property ${path.join('.')}`;
  const instance = new Error(message);
  instance.name = 'PropertyParsingError';
  instance.propertyKey = path[path.length - 1];
  instance.propertyPath = path;
  instance.inputType = inputType;
  instance.inputValue = value;
  instance.expectedTypes = expectedTypes;
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

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(PropertyParsingError, Error);
} else {
  // eslint-disable-next-line no-proto
  PropertyParsingError.__proto__ = Error;
}
export default PropertyParsingError;
