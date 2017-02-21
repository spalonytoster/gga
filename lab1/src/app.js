// jshint esversion: 6
let sketch;

let sketchHeight = 400, sketchWidth = 400;
let cellSize = 4;
let rows, cols;

let grid = [];

$(() => {
  // initialization
  rows = Math.floor(sketchHeight / cellSize);
  cols = Math.floor(sketchWidth / cellSize);

  console.log(rows, cols);

  let sketchFunction = (p) => {
    p.setup = () => {
      p.createCanvas(sketchWidth, sketchHeight);
      for (let y = rows-1; y >= 0; y--) {
        let row = [];
        for (let x = 0; x < cols; x++) {
          row.push(new Point(x, y));
        }
        grid.push(row);
      }
    };

    p.draw = () => {
      p.background(200);
      grid.forEach((row) => {
        row.forEach((col) => {
          p.rect();
        });
      });
    };
  };
  sketch = new p5(sketchFunction, 'sketch');
  sketch._loop = false;
});

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
