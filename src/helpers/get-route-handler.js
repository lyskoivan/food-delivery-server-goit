const getQueryFreeUrl = url => {
  const lastIndex = url.lastIndexOf("/");
  if (lastIndex !== 0) {
    return url.slice(0, lastIndex);
  }

  return url;
};

const getRouteHandler = (routerConfig, url) => {
  const clearUrl = getQueryFreeUrl(url);

  return routerConfig[clearUrl];
};

module.exports = getRouteHandler;
