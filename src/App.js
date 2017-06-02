import React, { Component } from 'react';

import raf from 'raf';



import { Neuron } from 'synaptic';
const A = new Neuron();
const B = new Neuron();

const connection = A.project(B);

A.activate(0.5);

export default class App extends Component {
  state = {
    focus: B.activate()
  }

  moveFocus() {
    const newFocus = Math.random();
    A.activate(newFocus);
    this.setState({ focus: newFocus });
  }

  turn() {
    // const { focus }
    // A.activate(Math.random)
  }

  learn() {
    const { focus } = this.state;
  }

  render() {
    const { focus } = this.state;

    return (
      <div>
        <div>Focus: {focus.toFixed(2)}</div>
        <div>Fact: {B.activate().toFixed(2)}</div>
        <button onClick={() => this.moveFocus()}>
          Move focus
        </button>
      </div>
    );
  }
}
