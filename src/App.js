import React, { Component } from 'react';
import Game from './Game';

import raf from 'raf';


export default class App extends Component {
  render() {
    return (
      <Game data={[ [ 1, 1, 0 ], [ 0, 1, 0 ], [ 0, 1, 0 ] ]}/>
    );
  }
}
