import {useState, useEffect} from 'react';
import axios from 'axios';
import useHistory from '../hooks/use-history';
import useInput from '../hooks/use-input';

const INITIAL_DATA = {count: 0, results: []};

function useFilters(url) {
  const [params, updateParams] = useHistory({search: '', page: 1});
  const [search, onSearchChange] = useInput(params.search);
  const [response, setResponse] = useState({
    loading: false,
    data: INITIAL_DATA,
  });

  const getData = async () => {
    setResponse({loading: true, data: INITIAL_DATA});
    const response = await axios.get(url, {params});
    setResponse({loading: false, data: response.data});
  };

  const onSearchSubmit = e => {
    e.preventDefault();
    updateParams({search, page: 1});
  };

  const handlePage = page => {
    const nextParams = {search, page};
    updateParams(nextParams);
  };

  const onNextPage = () => {
    handlePage(params.page + 1);
  };

  const onPrevPage = () => {
    handlePage(params.page - 1);
  };

  useEffect(() => {
    getData();
  }, [params]);

  return {
    loading: response.loading,
    data: response.data,
    params,
    search,
    onSearchChange,
    onSearchSubmit,
    onPrevPage,
    onNextPage,
  };
}

export default useFilters;
