import {useState, useEffect} from 'react';
import qs from 'query-string';

function useHistory(defaultValues) {
  const parseParams = () => {
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
  };

  const updateUrl = nextParams => {
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
  };

  const [params, setParams] = useState(parseParams);

  const updateParams = nextParams => {
    updateUrl(nextParams);
    setParams(nextParams);
  };

  useEffect(() => {
    const handlePopState = () => {
      const params = parseParams();
      setParams({...defaultValues, ...params});
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return [params, updateParams];
}

export default useHistory;
