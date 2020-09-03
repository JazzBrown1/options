function UnknownPropertyError(value, path) {
  const message = `Option property ${path.join('.')} is unknown`;
  const instance = new Error(message);
  instance.name = 'UnknownPropertyError';
  instance.propertyKey = path[path.length - 1];
  instance.propertyPath = path;
  instance.inputValue = value;
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, UnknownPropertyError);
  }
  return instance;
}

UnknownPropertyError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

Object.setPrototypeOf(UnknownPropertyError, Error);

export default UnknownPropertyError;
