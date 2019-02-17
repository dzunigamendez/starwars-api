import {useState, useEffect} from 'react';
import qs from 'query-string';

function useHistory() {
  const [params, setParams] = useState(qs.parse(window.location.search));

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

  const updateParams = nextParams => {
    updateUrl(nextParams);
    setParams(nextParams);
  };

  useEffect(() => {
    const handlePopState = () => {
      const params = qs.parse(window.location.search);
      setParams(params);
    };

    window.addListener('popstate', handlePopState);
    return () => {
      window.removeListener('popstate', handlePopState);
    };
  }, []);

  return [params, updateParams];
}

export default useHistory;
