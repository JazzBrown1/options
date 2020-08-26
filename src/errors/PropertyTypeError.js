import { getType } from '../getType';

function PropertyTypeError(option, value, path) {
  const inputType = getType(value);
  const expectedTypes = option.types;
  const message = `${path.join('.')} is of type ${inputType}, must be of the following type/s: ${expectedTypes.toString()}`;
  const instance = new Error(message);
  instance.name = 'PropertyTypeError';
  instance.propertyKey = path[path.length - 1];
  instance.propertyPath = path;
  instance.inputType = inputType;
  instance.inputValue = value;
  instance.expectedTypes = expectedTypes;
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, PropertyTypeError);
  }
  return instance;
}

PropertyTypeError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(PropertyTypeError, Error);
} else {
  // eslint-disable-next-line no-proto
  PropertyTypeError.__proto__ = Error;
}
export default PropertyTypeError;
