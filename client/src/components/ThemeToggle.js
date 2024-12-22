import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { BsSun, BsMoon } from 'react-icons/bs';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label="切换主题"
    >
      {theme === 'light' ? <BsMoon size={20} /> : <BsSun size={20} />}
    </button>
  );
}

export default ThemeToggle; 