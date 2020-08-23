import { getType } from './getType';

export default (option, input) => (Array.isArray(option.types) && option.types.includes(getType(input))) || (option.types && option.types === input);
