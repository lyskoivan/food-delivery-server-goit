const hasNumber = myString => /\d/.test(myString);

const getIdFreeUrl = url => {
  const lastIndex = url.lastIndexOf("/");
  const idString = url.slice(lastIndex + 1).trim();

  if (!hasNumber(idString)) {
    return url;
  }

  const idNumber = +idString;

  if (idNumber && lastIndex !== -1) {
    return url.slice(0, lastIndex);
  }

  return url;
};

const getRouteHandler = (routerConfig, url) => {
  const clearUrl = getIdFreeUrl(url);

  return routerConfig[clearUrl];
};

module.exports = getRouteHandler;
