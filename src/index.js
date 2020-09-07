import merge from './merge';
import build from './build';
import { flatMap } from './flatMap';
import { inflate } from './inflate';

const Options = function (schema, ops = {}) {
  build(schema, ops.dieHard || ops.dieHardBuild, this);
  Object.defineProperty(this, '__schema', {
    enumerable: false,
    value: schema
  });
  Object.defineProperty(this, '__private', {
    enumerable: false,
    value: {
      dieHardMerge: ops.dieHard || ops.dieHardMerge || false
    }
  });
};

Options.prototype.merge = function (...input) {
  merge(this.__schema, this.__private.dieHardMerge, this, input);
  return this;
};

Options.prototype.copy = function () {
  return new Options(this.__schema, {
    dieHardBuild: true, dieHardMerge: this.__private.dieHardMerge
  }).merge(this);
};

Options.prototype.flat = function (mapFunc) {
  return flatMap(this.__schema, mapFunc);
};

export default Options;
