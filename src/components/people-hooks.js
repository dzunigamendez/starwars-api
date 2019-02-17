import React, {useState, useEffect} from 'react';
import axios from 'axios';
import qs from 'query-string';
import Search from './search';
import Character from './character';
import Results from './results';
import '../scss/people.scss';

const BASE_URL = 'https://swapi.co/api/people';

function parseParams() {
  const params = qs.parse(window.location.search);
  return {
    search: params.search || '',
    page: parseInt(params.page, 10) || 1,
  };
}

function updateUrl(options) {
  const params = Object.keys(options).reduce((acc, key) => {
    if (options[key]) {
      acc[key] = options[key];
    }
    return acc;
  }, {});
  let url = window.location.pathname;
  if (params) {
    url = `${url}?${qs.stringify(params)}`;
  }
  window.history.pushState(null, null, url);
}

function PeopleHooks() {
  const [params, setParams] = useState(parseParams);
  const [search, setSearch] = useState(params.search);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({count: 0, results: []});

  const getData = async () => {
    setLoading(true);
    const response = await axios.get(BASE_URL, {params});
    setData(response.data);
    setLoading(false);
  };

  const handleSearchChange = e => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    updateUrl(params);
    setParams({search, page: 1});
  };

  const handlePage = page => {
    const nextParams = {search, page};
    updateUrl(nextParams);
    setParams(nextParams);
  };

  const handleNextPage = () => {
    handlePage(params.page + 1);
  };

  const handlePrevPage = () => {
    handlePage(params.page - 1);
  };

  const handlePopState = () => {
    const nextParams = parseParams();
    setParams(nextParams);
    setSearch(nextParams.search);
  };

  useEffect(() => {
    getData();
  }, [params]);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const items = data.results.map(item => (
    <Character item={item} key={item.url} />
  ));

  return (
    <div className="people">
      <h3 className="people__title">People</h3>
      <Search
        loading={loading}
        value={search}
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
      />
      <Results
        loading={loading}
        page={params.page}
        size={data.results.length}
        count={data.count}
        limit={10}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      >
        {items}
      </Results>
    </div>
  );
}

export default PeopleHooks;
