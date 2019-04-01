import qs from 'query-string';

export function parseParams(defaultValues = {}) {
  const params = qs.parse(window.location.search);
  return Object.keys(params).reduce(
    (acc, key) => {
      const value = params[key];
      if (!value) {
        return acc;
      }
      if (isNaN(value)) {
        acc[key] = value;
      } else {
        acc[key] = Number(value);
      }
      return acc;
    },
    {...defaultValues},
  );
}

export function updateUrl(nextParams) {
  const keys = Object.keys(nextParams).filter(key => nextParams[key]);
  let url = window.location.pathname;

  if (keys.length) {
    const params = keys.reduce((acc, key) => {
      if (nextParams[key]) {
        acc[key] = nextParams[key];
      }
      return acc;
    }, {});

    url = `${url}?${qs.stringify(params)}`;
  }
  window.history.pushState(null, null, url);
}
