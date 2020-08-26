import { getType } from '../getType';

function InvalidParentTypeError(value, path) {
  const inputType = getType(value);
  const message = `${path.join('.')} is a parent expected an Object instead received ${inputType}`;
  const instance = new Error(message);
  instance.name = 'InvalidParentTypeError';
  instance.propertyKey = path[path.length - 1];
  instance.propertyPath = path;
  instance.inputValue = value;
  instance.inputType = inputType;
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, InvalidParentTypeError);
  }
  return instance;
}

InvalidParentTypeError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(InvalidParentTypeError, Error);
} else {
  // eslint-disable-next-line no-proto
  InvalidParentTypeError.__proto__ = Error;
}
export default InvalidParentTypeError;
