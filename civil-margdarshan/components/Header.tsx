import React, { useState } from 'react';
import Logo from './Logo';
import { config } from '../config';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-navy text-white sticky top-0 z-50 shadow-lg border-b border-navy-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 cursor-pointer" onClick={(e) => {
            const hero = document.getElementById('hero');
            if(hero) hero.scrollIntoView({ behavior: 'smooth'});
          }}>
            <Logo className="h-12 w-12" showText={true} />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6 lg:space-x-8">
              <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="hover:text-saffron px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
              <a href="#exams" onClick={(e) => scrollToSection(e, 'exams')} className="hover:text-saffron px-3 py-2 rounded-md text-sm font-medium transition-colors">Exams</a>
              <a href="#videos" onClick={(e) => scrollToSection(e, 'videos')} className="hover:text-saffron px-3 py-2 rounded-md text-sm font-medium transition-colors">Videos</a>
              <a href="#community" onClick={(e) => scrollToSection(e, 'community')} className="hover:text-saffron px-3 py-2 rounded-md text-sm font-medium transition-colors">Community</a>
              <a href="#downloads" onClick={(e) => scrollToSection(e, 'downloads')} className="hover:text-saffron px-3 py-2 rounded-md text-sm font-medium transition-colors">Notes</a>
              <a 
                href={config.socialLinks.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <i className="fab fa-youtube"></i> Subscribe
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-navy-light focus:outline-none transition-colors"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-navy-light border-t border-gray-700 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="hover:text-saffron block px-3 py-3 rounded-md text-base font-medium border-b border-gray-700">Home</a>
            <a href="#exams" onClick={(e) => scrollToSection(e, 'exams')} className="hover:text-saffron block px-3 py-3 rounded-md text-base font-medium border-b border-gray-700">Exams</a>
            <a href="#videos" onClick={(e) => scrollToSection(e, 'videos')} className="hover:text-saffron block px-3 py-3 rounded-md text-base font-medium border-b border-gray-700">Videos</a>
            <a href="#community" onClick={(e) => scrollToSection(e, 'community')} className="hover:text-saffron block px-3 py-3 rounded-md text-base font-medium border-b border-gray-700">Community</a>
            <a href="#downloads" onClick={(e) => scrollToSection(e, 'downloads')} className="hover:text-saffron block px-3 py-3 rounded-md text-base font-medium border-b border-gray-700">Notes</a>
            <a 
              href={config.socialLinks.youtube} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-400 font-bold block px-3 py-3 rounded-md text-base mt-2"
            >
              <i className="fab fa-youtube mr-2"></i> Subscribe on YouTube
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;