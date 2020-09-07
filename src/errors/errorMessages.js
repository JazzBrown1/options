/* eslint-disable consistent-return */
/* eslint-disable default-case */

import { getType } from '../getType';

export default (option, input, path, type) => {
  switch (type) {
    case 'PropEnum':
      return `Failed to parse property ${path.join('.')}, must be one of the following values: ${option.enum.toString()}`;
    case 'PropType':
      return `Failed to parse property ${path.join('.')}, is of type: ${getType(input)}, must be one of the following types: ${option.types.toString()}`;
    case 'PropChecker':
      return `Failed to parse property ${path.join('.')}, checker failed please check it meets requirements`;
    case 'ParentType':
      return `${path.join('.')} is a parent expected type: Object instead received type: ${getType(input)}`;
    case 'UnknownProp':
      return `Option property ${path.join('.')} is unknown`;
    case 'MergeType':
      return '[Options].merge() inputs must be objects';
    case 'BuildType':
      return 'Options.build() input must be an object';
    case 'SchemaObject':
      return `Unable to parse schema object ${path.join('.')}, it should be an Object that contains a _parent or _property prop`;
    case 'SchemaTypes':
      return `Unable to parse schema object ${path.join('.')}, types should be of type: array but is of type ${getType(option.types)}`;
    case 'SchemaEnum':
      return `Unable to parse schema object ${path.join('.')}, enum should be of type: array but is of type ${getType(option.enum)}`;
    case 'SchemaChecker':
      return `Unable to parse schema object ${path.join('.')}, enum should be of type: array but is of type ${getType(option.enum)}`;
    case 'SchemaDefault':
      return `Unable to parse schema object ${path.join('.')}, the default value does not parse`;
  }
};
