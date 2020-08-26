import { getType } from './getType';
import PropertyTypeError from './errors/PropertyTypeError';
import PropertyParsingError from './errors/PropertyParsingError';

export default (option, input, path) => {
  if (option.types
    && !((Array.isArray(option.types) && option.types.includes(getType(input))) || (option.types && option.types === input))) {
    throw new PropertyTypeError(option, input, path);
  }
  if (option.parser) {
    if (!option.parser(input, option)) throw new PropertyParsingError(option, input, path);
  }
};
