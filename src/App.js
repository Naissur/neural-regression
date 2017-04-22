import React, { Component } from 'react';


// SVG SHAPES

const min = '-';
const bond = '~';
const fork = '<';

const pickWithChoice = (arr, num) => {
  const length = arr.length;
  const choice = Math.floor([num * length]); // ^ +
  return arr[choice];
}

const SVG_MIN = scale => (
  <line
    stroke="black"
    strokeWidth="2"
    x1="0" x2={-scale}
    y1 = "0" y2="0"
  />
);

const SVG_BOND = scale => (
  <line
    stroke="black"
    strokeWidth="2"
    x1="0" x2="0"
    y1="0" y2={scale}
  />
);

const SVG_FORK = scale => (
  <g>
    <line
      stroke="black"
      strokeWidth="2"
      x1="0" x2="0"
      y1 = "0" y2={-scale}
    />
    <line
      stroke="black"
      strokeWidth="2"
      x1="0" x1={scale}
      y2="0" y1="0"
    />
  </g>
);


// 0 <= x <= 1
const mapToBond = x => {
  const a = biForkate(x, 0.5);
  if (a <= 0.5) { return '-'; }

  const b = biForkate(x, a);
  if (a <= 0.5) { return '~'; }

  return '<';
}


const biForkate = (a, b) => {
  if (Math.random() <= 0.5) {
    return a;
  }
  return b;
}

const mapToSVGShape = x => {
  if (x <= 0.5) { return SVG_MIN; }
  if (x <= 0.25) { return SVG_BOND; }

  return SVG_FORK;
}


export default class App extends Component {
  state = {
    x: 0.5
  }

  turn() {
    this.setState({ x: Math.random() });
  }

  render() {
    const choice = this.state.x;

    const scale = 300;

    const TriFork = choice;

    const SHAPE = (pickWithChoice([SVG_MIN, SVG_BOND, SVG_FORK], choice))(scale);

    console.log(SHAPE);

    const pX = (Math.random() + 1) * scale / 4;
    const pY = (Math.random() + 1) * scale / 4;

    return (
      <svg
        style={{ width: scale, height: scale, border: '1px solid #000' }}
        onMouseMove={() => this.turn()}
      >
        <g transform={`translate(${pX}, ${pY})`}>
          {SHAPE}
        </g>
      </svg>
    );
  }
}
