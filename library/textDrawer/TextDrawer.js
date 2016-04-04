import CanvasDrawer from '../canvasDrawer/CanvasDrawer';

export class TextDrawer extends CanvasDrawer {

  text = 'text';

  constructor(canvas) {
    super(canvas);
  }

  startDrawing() {
    var ctx = this.canvas.getContext('2d');
    ctx.font = '48px serif';
    ctx.fillText(this.text, 10, 50);
  }

  stopDrawing() {}
}

export default TextDrawer ;
