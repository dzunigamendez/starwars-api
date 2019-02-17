import {useState, useEffect} from 'react';
import axios from 'axios';
import useHistory from '../hooks/use-history';
import useInput from '../hooks/use-input';

function useFilters(url) {
  const [params, updateParams] = useHistory();
  const [search, onSearchChange] = useInput(params.search || '');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({count: 0, results: []});

  const getData = async () => {
    setLoading(true);
    const response = await axios.get(url, {params});
    setData(response.data);
    setLoading(false);
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
    loading,
    data,
    params,
    search,
    onSearchChange,
    onSearchSubmit,
    onPrevPage,
    onNextPage,
  };
}

export default useFilters;
