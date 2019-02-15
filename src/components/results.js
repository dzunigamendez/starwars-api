import React from 'react';
import PropTypes from 'prop-types';
import '../scss/results.scss';

function Results({
  loading,
  page,
  count,
  limit,
  size,
  onPrevPage,
  onNextPage,
  children,
}) {
  if (loading) {
    return null;
  }

  const start = (page - 1) * limit + 1;
  const end = (page - 1) * limit + size;
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

  return (
    <div className="results">
      <div className="results__summary">
        <span>{summary}</span>
        <span>{total}</span>
      </div>
      <div className="results__wrapper">{children}</div>
      {paging}
    </div>
  );
}

Results.propTypes = {
  loading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
  children: PropTypes.any,
};

export default Results;
