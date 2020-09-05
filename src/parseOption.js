import { getType } from './getType';
import PropertyTypeError from './errors/PropertyTypeError';
import PropertyParsingError from './errors/PropertyParsingError';
import EnumError from './errors/EnumError';

export default (option, input, path) => {
  if (option.types
    && !((Array.isArray(option.types) && option.types.includes(getType(input))) || (option.types && option.types === input))) {
    throw new PropertyTypeError(option, input, path);
  }
  if (option.enum && !option.enum.includes(input)) throw new EnumError(option, input, path);
  if (option.parser && !option.parser(input, option)) throw new PropertyParsingError(option, input, path);
};
