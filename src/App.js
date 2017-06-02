import React, { Component } from 'react';

import raf from 'raf';


import { Neuron } from 'synaptic';


let A = new Neuron();
let B = new Neuron();
let connection = A.project(B);

function reset() {
  A = new Neuron();
  B = new Neuron();
  connection = A.project(B);

  A.activate(0.5);
}

reset();

export default class App extends Component {
  state = {
    a: A.activate(),
    b: B.activate()
  }

  componentWillMount() {
    reset();
  }

  reset() {
    reset();
  }

  setA(x) {
    A.activate(x);

    const b = B.activate();

    this.setState({ a: x, b });
  }

  setB(x) {
    B.activate(x);

    this.setState({ b: x });
  }

  learn() {
    const { a } = this.state;

    const learningRate = 0.3;

    for(var i = 0; i < 100; i++) {
      // when A activates a
      A.activate(a);

      // train B to activate a
      B.activate();
      B.propagate(learningRate, a);
    }

    const b = B.activate();

    this.setState({ a, b });
  }

  render() {
    const { a, b } = this.state;

    return (
      <div>
        A = {a.toFixed(2)}
        <input
          type="range"
          value={a}
          max="1"
          min="0"
          step="0.01"
          onChange={ev => this.setA(Number(ev.target.value))}
        />

        <br />

        B = {b.toFixed(2)}
        <input
          type="range"
          value={b}
          max="1"
          min="0"
          step="0.01"
          onChange={ev => this.setB(Number(ev.target.value))}
        />

        <div>Connection weight: {connection.weight.toFixed(2)}</div>

        <button onClick={() => this.learn()}>
          Enforce
        </button>
        <button onClick={() => this.reset()}>
          Reset
        </button>
      </div>
    );
  }
}
