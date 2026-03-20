import React, { useState, useEffect } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';

interface ExcalidrawEmbedProps {
  initialData?: any;
  height?: string;
}

export default function ExcalidrawEmbed({ initialData, height = '500px' }: ExcalidrawEmbedProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Astro uses dark mode globally per our styling
  useEffect(() => {
    setTheme('dark');
  }, []);

  return (
    <div style={{ height, width: '100%' }} className="my-8 rounded-xl overflow-hidden border border-zinc-800 shadow-lg">
      <Excalidraw 
        initialData={initialData} 
        theme={theme} 
        UIOptions={{ canvasActions: { loadScene: false, export: false, saveAsImage: false } }} 
      />
    </div>
  );
}
