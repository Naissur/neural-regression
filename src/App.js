import React, { Component } from 'react';

import raf from 'raf';


import { Neuron, Architect, Trainer } from 'synaptic';


let NETWORK, TRAINER;

function reset() {
  NETWORK = new Architect.Perceptron(1,2,1);
  TRAINER = new Trainer(NETWORK);
}

reset();

export default class App extends Component {
  state = {
    points: [ { x: 0, y: 0 } ],
  }

  handleMouseDown(ev) {
    const { clientX, clientY } = ev;
    const point = { x: clientX - 8, y: clientY - 8 };

    const newPoints = this.state.points.concat(point);

    this.setState({ points: newPoints });
  }

  clearPoints() {
    this.setState({ points: [] });
  }

  render() {
    const { points } = this.state;

    return (
      <div>
        <svg
          width={200}
          height={200}
          style={{ border: '1px solid #000' }}
          onMouseDown={ev => this.handleMouseDown(ev)}
        >
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={4}
              fill='black'
            />
          ))}
        </svg>

        <br />
        <button onClick={() => this.clearPoints()}>Clear</button>
      </div>
    );
  }
}
