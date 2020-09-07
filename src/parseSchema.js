import { isObj } from './getType';
import OptionsError from './errors/OptionsError';
import parseInput from './parseInput';

export default (option, path) => {
  if (!isObj(option)) throw new OptionsError(option, undefined, path, 'SchemaObject');
  if (option._parent) return;
  if (!option._property) throw new OptionsError(option, undefined, path, 'SchemaObject');
  if (option.types && !Array.isArray(option.types)) throw new OptionsError(option, undefined, path, 'SchemaTypes');
  if (option.enum && !Array.isArray(option.enum)) throw new OptionsError(option, undefined, path, 'SchemaEnum');
  if (option.parser && typeof option.parser !== 'function') throw new OptionsError(option, undefined, path, 'SchemaParser');
  if (option.default) try { parseInput(option, option.default, path); } catch (err) { throw new OptionsError(option, undefined, path, 'SchemaDefault'); }
};
