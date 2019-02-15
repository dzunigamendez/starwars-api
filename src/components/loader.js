import React from 'react';
import PropTypes from 'prop-types';
import '../scss/loader.scss';

function Loader({loading = false, message = 'Loading...'}) {
  if (!loading) {
    return null;
  }

  return (
    <div className="loader">
      <span>{message}</span>
    </div>
  );
}

Loader.propTypes = {
  loading: PropTypes.bool,
  message: PropTypes.string,
};

export default Loader;
