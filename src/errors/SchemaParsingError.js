function SchemaParsingError(value, path) {
  const message = `Unable to parse schema object ${path.join('.')} should be an Object that contains a _parent or _property prop`;
  const instance = new Error(message);
  instance.name = 'SchemaParsingError';
  instance.propertyKey = path[path.length - 1];
  instance.propertyPath = path;
  instance.inputValue = value;
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, SchemaParsingError);
  }
  return instance;
}

SchemaParsingError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

Object.setPrototypeOf(SchemaParsingError, Error);

export default SchemaParsingError;
