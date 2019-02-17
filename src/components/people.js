import React from 'react';
import Search from './search';
import Character from './character';
import Results from './results';
import useFilters from '../hooks/use-filters';
import '../scss/people.scss';

const BASE_URL = 'https://swapi.co/api/people';

function PeopleHooks() {
  const {
    loading,
    data,
    params,
    search,
    onSearchChange,
    onSearchSubmit,
    onPrevPage,
    onNextPage,
  } = useFilters(BASE_URL);

  const items = data.results.map(item => (
    <Character item={item} key={item.url} />
  ));

  return (
    <div className="people">
      <h3 className="people__title">People</h3>
      <Search
        loading={loading}
        value={search}
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
      />
      <Results
        loading={loading}
        page={params.page || 1}
        size={data.results.length}
        count={data.count}
        limit={10}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
      >
        {items}
      </Results>
    </div>
  );
}

export default PeopleHooks;
