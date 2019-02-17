import React from 'react';
import {hot} from 'react-hot-loader/root';
import People from './people';
import '../scss/app.scss';

const App = () => (
  <div className="app">
    <h2 className="app__title">Star Wars API</h2>
    <People />
  </div>
);

export default hot(App);
