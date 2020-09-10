import { isObj } from './getType';
import OptionsError from './errors/OptionsError';
import checkInput from './checkInput';

export default (option, path) => {
  if (!isObj(option)) throw new OptionsError(option, undefined, path, 'SchemaObject');
  if (option._parent) return;
  if (!option._property) throw new OptionsError(option, undefined, path, 'SchemaObject');
  if (option.types && !Array.isArray(option.types)) throw new OptionsError(option, undefined, path, 'SchemaTypes');
  if (option.enum && !Array.isArray(option.enum)) throw new OptionsError(option, undefined, path, 'SchemaEnum');
  if (option.checker && typeof option.checker !== 'function') throw new OptionsError(option, undefined, path, 'SchemaChecker');
  if (option.default) try { checkInput(option, option.default, path); } catch (err) { throw new OptionsError(option, undefined, path, 'SchemaDefault'); }
};
