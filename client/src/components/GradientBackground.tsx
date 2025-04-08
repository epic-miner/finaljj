import React, { useEffect, useRef } from 'react';

interface GradientBackgroundProps {
  className?: string;
}

export default function GradientBackground({ className }: GradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Create gradient circles
    const circles = [
      { x: width * 0.3, y: height * 0.4, radius: height * 0.4, color: '#e0f2fe' },
      { x: width * 0.7, y: height * 0.6, radius: height * 0.5, color: '#e7f8f6' },
      { x: width * 0.2, y: height * 0.8, radius: height * 0.3, color: '#f3e9de' },
      { x: width * 0.8, y: height * 0.2, radius: height * 0.35, color: '#e2e8f0' }
    ];
    
    // Function to draw the gradient background
    const drawBackground = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Fill with light background
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);
      
      // Draw each circle with gradient
      circles.forEach(circle => {
        const gradient = ctx.createRadialGradient(
          circle.x, circle.y, 0,
          circle.x, circle.y, circle.radius
        );
        
        gradient.addColorStop(0, circle.color);
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw subtle grid pattern
      ctx.globalAlpha = 0.05;
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      
      // Draw horizontal lines
      const gridSpacing = 50;
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Draw vertical lines
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
    };
    
    // Initial draw
    drawBackground();
    
    // Handle window resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Reposition circles proportionally
      circles[0] = { x: width * 0.3, y: height * 0.4, radius: height * 0.4, color: '#e0f2fe' };
      circles[1] = { x: width * 0.7, y: height * 0.6, radius: height * 0.5, color: '#e7f8f6' };
      circles[2] = { x: width * 0.2, y: height * 0.8, radius: height * 0.3, color: '#f3e9de' };
      circles[3] = { x: width * 0.8, y: height * 0.2, radius: height * 0.35, color: '#e2e8f0' };
      
      drawBackground();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute top-0 left-0 w-full h-full -z-10 overflow-hidden ${className}`}
    />
  );
}