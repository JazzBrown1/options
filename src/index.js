import { mergeTrusted, mergeManyTrusted } from './merge';
import build from './build';

const opsSchema = {
  safeMode: {
    type: ['boolean'],
    default: true,
  },
};

const Options = function (schema, options = {}) {
  this.options = mergeTrusted(opsSchema, build(opsSchema), options);
  this.current = build(schema);
  this.update = function (...args) {
    return mergeManyTrusted(schema, this.current, ...args);
  };
  this.copy = function (...args) { return mergeManyTrusted(schema, {}, this.current, ...args); };
  this.get = !this.options.safeMode ? function () { return this.current; }
    : function () { return mergeTrusted(schema, {}, this.current); };
};

Options.merge = function (...args) {
  const schema = args[0];
  build(schema); // parses schema
  const merged = mergeManyTrusted(...args);
  mergeTrusted(schema, {}, merged);
  return merged;
};

Options.build = function (schema) {
  return build(schema);
};

export default Options;
