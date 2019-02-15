import React, {useState, useEffect} from 'react';
import axios from 'axios';
import qs from 'query-string';
import Search from './search';
import Character from './character';
import Results from './results';
import '../scss/people.scss';

const BASE_URL = 'https://swapi.co/api/people';

function PeopleHooks() {
  const params = qs.parse(window.location.search);
  const [search, setSearch] = useState(params.search || '');
  const [criteria, setCriteria] = useState(search);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(parseInt(params.page, 10) || 1);
  const [data, setData] = useState({
    count: 0,
    results: [],
  });

  const loadData = async () => {
    setLoading(true);
    const response = await axios.get(BASE_URL, {params: {search, page}});
    setData(response.data);
    setLoading(false);
  };

  const handleSearchChange = e => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    updateUrl({search, page});
    setPage(1);
    setCriteria(search);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    this.setPage(page - 1);
  };

  const handlePopState = () => {
    const params = qs.parse(window.location.search);
    setSearch(params.search || '');
    setCriteria(params.search || '');
    setPage(parseInt(params.page, 10) || 1);
  };

  useEffect(() => {
    loadData();
  }, [criteria, page]);

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
        page={page}
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

export default PeopleHooks;
