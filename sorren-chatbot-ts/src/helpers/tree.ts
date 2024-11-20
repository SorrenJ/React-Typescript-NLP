// src/drawTree.ts

// Tree parameters
const levelsMin = 2;
const levelsMax = 4;
const initialLength = 100;
const angleMin = Math.PI / 17;
const angleMax = Math.PI / 10;

// Helper function to map mouse position to tree properties
function map(value: number, start1: number, stop1: number, start2: number, stop2: number) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

// Draw flowers on branches
function drawFlowers(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.fillStyle = '#db4cb3';
  ctx.shadowColor = '#db4cb3';
  ctx.shadowBlur = Math.random() * 15 + 10;
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.fillStyle = '#FFB6C1';
    ctx.shadowColor = '#FFB6C1';
    ctx.shadowBlur = Math.random() * 15 + 10;
    ctx.beginPath();
    ctx.arc(0, -15, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.rotate(Math.PI * 2 / 5);
  }
}

// Recursive function to draw branches of the tree
function tree(ctx: CanvasRenderingContext2D, levels: number, length: number, angle: number) {
  if (levels > 0) {
    ctx.save();
    ctx.strokeStyle = '#FFF';
    ctx.shadowColor = '#FFF';
    ctx.shadowBlur = Math.random() * 20 + 10;

    ctx.rotate(angle / 2.5);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.stroke();

    ctx.translate(0, -length);
    ctx.scale(0.95, 0.95);
    ctx.lineWidth = levels;

    tree(ctx, levels - 1, length, angle);
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = '#FFF';
    ctx.shadowColor = '#FFF';
    ctx.rotate(-angle / 2.5);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.stroke();

    ctx.translate(0, -length);
    ctx.scale(0.95, 0.95);
    ctx.lineWidth = levels;

    tree(ctx, levels - 1, length, angle);
    ctx.restore();
  } else {
    drawFlowers(ctx);
  }
}

// Main function to draw the entire tree
export function drawTree(
  ctx: CanvasRenderingContext2D,
  mouseX: number,
  mouseY: number,
  canvasWidth: number,
  canvasHeight: number
) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  const currentAngle = map(mouseX * 10, 0, canvasWidth, angleMin, angleMax);
  const currentLevels = Math.floor(map(mouseY, canvasHeight, 0, levelsMin, levelsMax));

  ctx.save();
  ctx.translate(canvasWidth / 2, canvasHeight);
  ctx.lineWidth = 10;
  tree(ctx, currentLevels, initialLength, currentAngle);
  ctx.restore();
}
