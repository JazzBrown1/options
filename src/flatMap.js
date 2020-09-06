const defaultMap = (el, key, path) => {
  const name = el.name || path.join('>');
  return [name, { ...el, name }];
};

const flatMap = (_schema, mapFunc = defaultMap) => {
  const f = (schema, path, output, flatRef) => {
    Object.keys(schema).forEach((key) => {
      if (key === '_parent' || key === '_property') return;
      const option = schema[key];
      const newPath = [...path, key];
      if (option._parent) {
        f(option, newPath, output, flatRef);
      } else {
        const result = mapFunc(option, key, newPath);
        if (!result) return;
        const [name, el] = result;
        output.push(el);
        flatRef[name] = newPath;
      }
    });
    return [output, flatRef];
  };
  return f(_schema, [], [], {});
};

const flatMapToMany = (_schema, mapFunc = defaultMap) => {
  const f = (schema, path, output, flatRef) => {
    Object.keys(schema).forEach((key) => {
      if (key === '_parent' || key === '_property') return;
      const option = schema[key];
      const newPath = [...path, key];
      if (option._parent) {
        f(option, newPath, output, flatRef);
      } else {
        const result = mapFunc(option, key, newPath);
        if (!result) return;
        const [name, el] = result;
        if (!flatRef[name]) {
          flatRef[name] = [];
          output.push(el);
        }
        flatRef[name].push(newPath);
      }
    });
    return [output, flatRef];
  };
  return f(_schema, [], [], {});
};

export { flatMap, flatMapToMany };
export default flatMap;
