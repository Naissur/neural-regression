import React, { Component } from 'react';
const throttle = require('throttle-function');

console.log(throttle);

function colorFromRandom(x) {
  return colToCSS(x);
}

function getRandomColor() {
  const a = Math.random();
  const b = Math.random();
  const c = a * b;

  return colorFromRandom(c);
}


const colToCSS = x => {
  const h = x * 360;
  const s = 60;
  const l = 70;

  console.log(x, h, s, l);

  return (`hsl(${h},${s}%,${l}%)`);
}


export default class App extends Component {
  state = {
    x : Math.random(),
    r : Math.random(),
    g : Math.random(),
    b : Math.random()
  }

  constructor(props, ctx) {
    super(props, ctx);

    this.swapColors = throttle(() => {
      this.setState({
        x: Math.floor(((this.state.x + 0.1) * 100) % 100)/100,
        a: Math.random(),
        b: Math.random(),
        c: Math.random()
      });
    },{   // call a maximum of 10 times per 5 second minute window 
      window: 1,
      limit: 10
    } );
  }

  render() {
    const { x, a, b, c } = this.state;

    return (
      <div onMouseMove={() => this.swapColors()}>
        <div style={{ height: 60, backgroundColor: colorFromRandom(x * a) }}/>
        <div style={{ height: 60, backgroundColor: colorFromRandom(x * b) }}/>
        <div style={{ height: 60, backgroundColor: colorFromRandom(x * c) }}/>
      </div>
    );
  }
}
