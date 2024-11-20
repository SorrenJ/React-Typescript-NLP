import React, { useRef, useEffect, useState } from 'react';
import { drawTree } from './helpers/tree';

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const startGame = () => {
    console.log('Game started!');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Event listener to track mouse movement and update tree drawing
      const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        setMouseX(event.clientX - rect.left);
        setMouseY(event.clientY - rect.top);
        drawTree(ctx, mouseX, mouseY, canvas.width, canvas.height);
      };

      canvas.addEventListener('mousemove', handleMouseMove);

      // Initial tree drawing
      drawTree(ctx, mouseX, mouseY, canvas.width, canvas.height);

      // Cleanup function to remove event listener
      return () => canvas.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  return (
    <div id="startScreen" onClick={startGame} style={{ textAlign: 'center' }}>
      <h1>Sorren's Portfolio</h1>
      <canvas ref={canvasRef} id="treeCanvas" width={800} height={400}></canvas>
      <p>Click Anywhere to Start</p>
    </div>
  );
};

export default Home;
