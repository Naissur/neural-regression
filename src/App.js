import React, { Component } from 'react';
import raf from 'raf';

import { Neuron, Architect, Trainer } from 'synaptic';



// neural network and trainer

let NETWORK, TRAINER;

const SVG_WIDTH = 400;
const PLOT_STEP = 0.004;

function reset() {
  NETWORK = new Architect.Perceptron(1,4,4,1);
  TRAINER = new Trainer(NETWORK);
}

reset();



// React components

const Plot = ({ points, onMouseDown, children }) => (
  <svg
    width={SVG_WIDTH}
    height={SVG_WIDTH}
    style={{ border: '1px solid #000' }}
    onMouseDown={onMouseDown}
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

    {children}
  </svg>

);


// impure, uses NETWORK
const RegressionPoints = () => {
  // get range
  let range = [];

  for(var i = 0; i < 1; i += PLOT_STEP) {
    range.push(i)
  }


  // collect outputs
  const coords = range.map(x => ({ x, fx: NETWORK.activate([x]) }));

  return (
    <g>
      {coords.map(
        ({ x, fx }, index) => (
          <circle
            key={index}
            cx={x * SVG_WIDTH}
            cy={fx * SVG_WIDTH}
            r={1}
            fill='orange'
          />
        )
      )}
    </g>
  );
};


export default class App extends Component {
  state = {
    points: [ { x: 0, y: 0 } ],
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 30);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    raf(() => this.trainOnPoints());
  }

  handleMouseDown(ev) {
    const { clientX, clientY } = ev;
    const point = { x: clientX - 8, y: clientY - 8 };

    const newPoints = this.state.points.concat(point);

    this.setState({ points: newPoints });
    this.trainOnPoints();
  }

  clearPoints() {
    this.setState({ points: [] });
  }

  reset() {
    reset();
  }


  // NETWORK

  trainOnPoints() {
    const { points } = this.state;

    // get training data
    const trainingData = points
      .map( ({ x, y }) => ({ x: x / SVG_WIDTH, y: y / SVG_WIDTH }))
      .map( ({ x, y }) => ({
        input: [x],
        output: [y]
      })
    );

    // train network
    TRAINER.train(trainingData, {
      learningRate: 0.3,
      iterations: 400
    });

    // update UI
    this.forceUpdate();
  }

  render() {
    const { points } = this.state;

    return (
      <div>
        <Plot points={points} onMouseDown={ev => this.handleMouseDown(ev)}>
          <RegressionPoints />
        </Plot>
        <br />
        <button onClick={() => this.clearPoints()}>Clear</button>
        <button onClick={() => this.reset()}>Reset</button>
      </div>
    );
  }
}
