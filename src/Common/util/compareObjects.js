export default (obj1, obj2) => {
  const sortNames = (obj) => {
    const sortedObj = {};
    const sortedKeys = Object.keys(obj).sort((x, y) => (x > y ? 1 : -1));

    sortedKeys.forEach((e) => {
      sortedObj[e] = obj[e];
    });

    return sortedObj;
  };

  return JSON.stringify(sortNames(obj1)) === JSON.stringify(sortNames(obj2));
};
