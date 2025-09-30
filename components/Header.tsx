
import React from 'react';
import type { Page } from '../types';

interface HeaderProps {
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-[#111] text-white shadow-lg shadow-yellow-500/10 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-[#d4af37] cursor-pointer" onClick={() => onNavigate('home')}>
          Luxury Cases DZ
        </div>
        <nav className="hidden md:flex space-x-6 space-x-reverse">
          <button onClick={() => onNavigate('home')} className="hover:text-[#d4af37] transition-colors">الرئيسية</button>
          <button onClick={() => onNavigate('about')} className="hover:text-[#d4af37] transition-colors">من نحن</button>
          <button onClick={() => onNavigate('contact')} className="hover:text-[#d4af37] transition-colors">اتصل بنا</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;