
import React from 'react';
import { config } from '../config';

const Hero: React.FC = () => {
  const scrollToExams = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('exams');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="hero" className="relative bg-navy overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" fill="white" xmlns="http://www.w3.org/2000/svg">
              <defs>
                  <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" />
                  </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dot-pattern)" />
          </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
          <span className="block">Welcome to</span>
          <span className="block text-saffron mt-2">Civil Margdarshan</span>
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-gray-300">
          Your Ultimate Guide to Rajasthan Government Exams. 
          Master RPSC, REET, and RSMSSB with expert guidance.
        </p>
        <div className="mt-10 flex gap-4 flex-col sm:flex-row">
          <a
            href={config.socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10 shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center"
          >
            <i className="fab fa-youtube mr-2"></i> Subscribe Now
          </a>
          <a
            href="#exams"
            onClick={scrollToExams}
            className="px-8 py-3 border border-saffron text-base font-medium rounded-full text-saffron hover:bg-saffron hover:text-white md:py-4 md:text-lg md:px-10 transition-colors flex items-center justify-center"
          >
            Explore Courses
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
