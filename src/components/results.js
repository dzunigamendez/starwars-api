import React from 'react';
import PropTypes from 'prop-types';
import Character from './character';
import Loader from './loader';
import '../scss/results.scss';

function Results({loading, params, data, onPrevPage, onNextPage}) {
  if (loading) {
    return <Loader />;
  }

  const {page} = params;
  const {count} = data;
  const limit = 10;
  const start = (page - 1) * limit + 1;
  const end = (page - 1) * limit + data.results.length;
  const pages = Math.ceil(count / limit);

  let summary = null;
  let total = null;
  let paging = null;

  if (count > 1) {
    summary = `Viewing ${start} - ${end} of ${count} results`;
  } else if (count === 1) {
    summary = `${count} result`;
  } else {
    summary = `0 results`;
  }

  if (pages > 1) {
    total = `Page ${page} of ${pages}`;
    paging = (
      <div className="results__paging">
        <button
          type="button"
          className="page page--prev"
          onClick={onPrevPage}
          disabled={page === 1}
        >{`<< Prev`}</button>
        <button
          type="button"
          className="page page--next"
          onClick={onNextPage}
          disabled={page === pages}
        >{`Next >>`}</button>
      </div>
    );
  }

  const items = data.results.map(item => (
    <Character item={item} key={item.url} />
  ));

  return (
    <div className="results">
      <div className="results__summary">
        <span>{summary}</span>
        <span>{total}</span>
      </div>
      <div className="results__wrapper">{items}</div>
      {paging}
    </div>
  );
}

Results.propTypes = {
  loading: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
  children: PropTypes.any,
};

export default Results;
