import React, { useState, useEffect, useRef } from 'react';

const THEMES = [
  { id: 'pink', color: '#f472b6', hover: '#f9a8d4' },
  { id: 'purple', color: '#c084fc', hover: '#d8b4fe' },
  { id: 'yellow', color: '#facc15', hover: '#fde047' },
  { id: 'green', color: '#4ade80', hover: '#86efac' },
  { id: 'blue', color: '#60a5fa', hover: '#93c5fd' }
];

export default function ThemePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('blue');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('theme-color') || 'blue';
    setActiveTheme(saved);

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const setTheme = (id: string, color: string, hover: string) => {
    setActiveTheme(id);
    localStorage.setItem('theme-color', id);
    document.documentElement.style.setProperty('--theme-color', color);
    document.documentElement.style.setProperty('--theme-color-hover', hover);
    setIsOpen(false);
  };

  const activeColor = THEMES.find(t => t.id === activeTheme)?.color || THEMES[4].color;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-7 h-7 rounded border border-zinc-800 hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-600"
        aria-label="Theme picker"
      >
        <span 
          className="w-3.5 h-3.5 rounded-full shadow-inner" 
          style={{ backgroundColor: activeColor }}
        />
      </button>

      {isOpen && (
        <div className="absolute top-10 left-0 z-50 py-3 px-2 bg-[rgb(30,30,33)] border border-zinc-800 rounded-lg shadow-xl flex flex-col gap-3 items-center animate-in fade-in zoom-in-95 duration-100">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setTheme(theme.id, theme.color, theme.hover)}
              className={`w-5 h-5 rounded-full transition-transform hover:scale-110 shadow-inner ${activeTheme === theme.id ? 'ring-2 ring-white ring-offset-2 ring-offset-[rgb(30,30,33)]' : ''}`}
              style={{ backgroundColor: theme.color }}
              aria-label={`Select ${theme.id} theme`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
