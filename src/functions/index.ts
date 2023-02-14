let id = 0;

export default (prefix = 'uniqueId') => {
  id += 1;
  return `${prefix}${id}`;
};
