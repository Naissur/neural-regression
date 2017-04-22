import React, { Component } from 'react';

import raf from 'raf';


const MAX_BOUNDS = 300;
const MAX_SCALE = 100;
const MIN_DERIVATION = 100;


// SVG SHAPES

const min = '-';
const bond = '~';
const fork = '<';

const pickWithChoice = (arr, num) => {
  const length = arr.length;
  const choice = Math.floor([num * length]); // ^ +
  return arr[choice];
}

const SVG_FACT = (
  <circle
    cx="0" cy="0" r="6"

    stroke="black"
    strokeWidth="2"
  />
);

const SVG_MIN = scale => (
  <g>
    {SVG_FACT}
    <line
      stroke="black"
      strokeWidth="2"
      x1="0" x2={-scale}
      y1 = "0" y2="0"
    />
  </g>
);

const SVG_BOND = scale => (
  <g>
    {SVG_FACT}
    <line
      stroke="black"
      strokeWidth="2"
      x1="0" x2="0"
      y1="0" y2={scale}
    />
  </g>
);

const SVG_FORK = scale => (
  <g>
    {SVG_FACT}
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
    x: 0.5,
    mX: 0,
    mY: 0
  }


  handleMouseMove(ev) {
    this.setState({ mX: ev.clientX, mY: ev.clientY });
  }

  turn(x, y) {
    const { mX, mY } = this.state;

    raf(() => {
      this.setState({
        x: Math.random()
      });
    });
  }

  render() {
    const { mX, mY } = this.state;

    const choice = Math.random();
    // const SHAPE = (pickWithChoice([SVG_MIN, SVG_BOND, SVG_FORK], choice))(MAX_SCALE);

    return (
      <svg
        style={{ width: MAX_BOUNDS, height: MAX_BOUNDS, border: '1px solid #000', cursor: 'none' }}
        onMouseMove={::this.handleMouseMove}
      >
        <circle
          cx={mX} cy={mY} r="6"
          stroke="black"
          strokeWidth="2"
        />
        <g transform={`translate(${mX}, ${mY}) rotate(${(mX + mY) % 360})`}>
          {SVG_BOND(MAX_SCALE)}
        </g>
      </svg>
    );
  }
}
