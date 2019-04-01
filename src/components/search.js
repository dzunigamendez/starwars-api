import React from 'react';
import PropTypes from 'prop-types';
import '../scss/search.scss';

function Search({value, onChange, onSubmit}) {
  return (
    <div className="search">
      <form className="search__form" onSubmit={onSubmit}>
        <input className="search__input" value={value} onChange={onChange} />
        <button type="submit" className="search__submit">
          Search
        </button>
      </form>
    </div>
  );
}

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Search;
