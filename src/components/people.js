import React, {useMemo} from 'react';
import Search from './search';
import Results from './results';
import useFilters from '../hooks/use-filters';
import '../scss/people.scss';

const BASE_URL = 'https://swapi.co/api/people';

function PeopleHooks() {
  const {
    state: {loading, search, params, data},
    onSearchChange,
    onSearchSubmit,
    onPrevPage,
    onNextPage,
  } = useFilters(BASE_URL);

  const searchForm = useMemo(
    () => (
      <Search
        value={search}
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
      />
    ),
    [search],
  );

  const results = useMemo(
    () => (
      <Results
        loading={loading}
        params={params}
        data={data}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
      />
    ),
    [loading, params, data],
  );

  return (
    <div className="people">
      <h3 className="people__title">People</h3>
      {searchForm}
      {results}
    </div>
  );
}

export default PeopleHooks;
