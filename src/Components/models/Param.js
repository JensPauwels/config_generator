
export default (object, item, defaultValue = '') => {
  if (object !== undefined && item !== undefined) {
    if (object[item] !== undefined && object[item] !== '' && object[item] !== null) {
      return object[item];
    }
    return defaultValue;
  }
  return defaultValue;
};
