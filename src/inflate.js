// this could be alot better
const add = (arra, obj, value) => {
  const arr = [...arra];
  const last = arr.pop();
  const root = arr.reduce((acc, cur) => {
    if (!acc[cur]) acc[cur] = {};
    return acc[cur];
  }, obj);
  root[last] = value;
};

const inflate = (ref) => (input) => {
  const obj = {};
  Object.entries(input).forEach(([key, val]) => {
    const path = ref[key];
    if (!path) return;
    add(path, obj, val);
  });
  return obj;
};

const inflateToMany = (ref) => (input) => {
  const obj = {};
  Object.entries(input).forEach(([key, val]) => {
    const paths = ref[key];
    if (!paths) return;
    paths.forEach((path) => add(path, obj, val));
  });
  return obj;
};

export { inflate, inflateToMany };
export default inflate;
