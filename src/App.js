import React, { Component } from 'react';

import raf from 'raf';


import { Neuron, Architect, Trainer } from 'synaptic';


let NETWORK, TRAINER;

const SVG_WIDTH = 200;
const PLOT_STEP = 0.01;

function reset() {
  NETWORK = new Architect.Perceptron(1,4,4,1);
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


  // NETWORK

  getPlottedPattern() {
    const { points } = this.state;

    // points are training data !!


    // get range
    let range = [];

    for(var i = 0; i < 1; i += PLOT_STEP) {
      range.push(i)
    }


    // collect outputs
    const coords = range.map(x => ({ x, fx: NETWORK.activate([x]) }));

    return coords.map(
      ({ x, fx }, index) => (
        <circle
          key={index}
          cx={x * SVG_WIDTH}
          cy={fx * SVG_WIDTH}
          r={1}
          fill='orange'
        />
      )
    )
  }

  render() {
    const { points } = this.state;

    return (
      <div>
        <svg
          width={SVG_WIDTH}
          height={SVG_WIDTH}
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

          {this.getPlottedPattern()}
        </svg>

        <br />
        <button onClick={() => this.clearPoints()}>Clear</button>
      </div>
    );
  }
}
