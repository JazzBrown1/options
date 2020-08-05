const getType = (x) => {
  const type = typeof x;
  if (type !== 'object') return type;
  if (x === null) return 'null';
  if (Array.isArray(x)) return 'array';
  return 'object';
};

const isObj = (x) => getType(x) === 'object';

export { getType, isObj };
