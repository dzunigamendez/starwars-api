import React from 'react';
import PropTypes from 'prop-types';
import '../scss/character.scss';

function Character({item}) {
  return (
    <figure className="character">
      <div className="character__image-wrapper" />
      <figcaption className="character__info">
        <h4 className="character__name">{item.name}</h4>
        <dl className="character__details">
          <dt>Birth Year</dt>
          <dd>{item.birth_year}</dd>
          <dt>Gender</dt>
          <dd>{item.gender}</dd>
          <dt>Hair Color</dt>
          <dd>{item.hair_color}</dd>
          <dt>Height</dt>
          <dd>{item.height}</dd>
          <dt>Mass</dt>
          <dd>{item.mass}</dd>
          <dt>Skin Color</dt>
          <dd>{item.skin_color}</dd>
        </dl>
      </figcaption>
    </figure>
  );
}

Character.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    birth_year: PropTypes.string,
    gender: PropTypes.string,
    hair_color: PropTypes.string,
    height: PropTypes.string,
    mass: PropTypes.string,
    skin_color: PropTypes.string,
  }),
};

export default Character;
