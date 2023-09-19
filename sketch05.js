const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: false
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    //Numero de columnas y numero de filas
    const cols = 80;
    const rows = 80;
    const numCells = cols * rows;
    //Ancho de filas, celdas y espaciado entre ellas
    const gridw = width * 0.8;
    const gridh = height * 0.8;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;
    //Bucle para iterar el numero de las columnas y filas
    for(let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i/cols);

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      const n = random.noise2D(x + frame * 10, y, 0.002);
      const angle = n * Math.PI * 0.2;
      //const scale = (n + 1) / 2 * 30;
      //const scale = (n * 0.5 + 0.5) * 30;
      const scale = math.mapRange(n, -1, 1, 1, 30);

      context.save();
      context.translate(x,y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);
      context.rotate(angle);
      context.lineWidth = scale;

      context.beginPath();
      context.moveTo(w * -0.5, 3);
      context.lineTo(w * 0.13, 0);
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
