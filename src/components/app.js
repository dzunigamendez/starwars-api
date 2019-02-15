import React from 'react';
import {hot} from 'react-hot-loader/root';
import PeopleHook from './people-hooks';
import '../scss/app.scss';

const App = () => (
  <div className="app">
    <h2 className="app__title">Star Wars API</h2>
    <PeopleHook />
  </div>
);

export default hot(App);
