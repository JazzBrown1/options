import { getType } from './getType';
import OptionsError from './errors/OptionsError';

export default (option, input, path) => {
  if (option.types && !option.types.includes(getType(input))) throw new OptionsError(option, input, path, 'PropType');
  if (option.enum && !option.enum.includes(input)) throw new OptionsError(option, input, path, 'PropEnum');
  if (option.checker && !option.checker(input, option)) throw new OptionsError(option, input, path, 'PropChecker');
};
