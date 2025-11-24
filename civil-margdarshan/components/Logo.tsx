import React from 'react';

interface LogoProps {
  className?: string; // For the SVG sizing
  showText?: boolean;
  textSize?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = "h-10 w-10", showText = false, textSize = 'md' }) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <svg
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Civil Margdarshan Logo"
      >
        {/* Navy Background Circle */}
        <circle cx="50" cy="50" r="50" fill="#001f3f" />
        
        {/* Saffron Border Ring */}
        <circle cx="50" cy="50" r="46" stroke="#FF9933" strokeWidth="2" />
        
        {/* Abstract Book (White) */}
        <path 
          d="M20 65 C 20 65, 35 80, 50 70 C 65 80, 80 65, 80 65 V 75 C 80 75, 65 90, 50 80 C 35 90, 20 75, 20 75 Z" 
          fill="white" 
        />
        
        {/* Pen Nib / Torch (Saffron) */}
        <path d="M50 20 L 65 50 L 50 65 L 35 50 Z" fill="#FF9933" />
        
        {/* Stylized Nib Details */}
        <path d="M50 20 L 50 65" stroke="#001f3f" strokeWidth="0.5" opacity="0.3" />
        <path d="M50 55 L 50 65" stroke="white" strokeWidth="2" />
        
        {/* Rays representing Enlightenment/Spark */}
        <circle cx="50" cy="12" r="2.5" fill="#FF9933" />
        <circle cx="20" cy="40" r="2" fill="#FF9933" />
        <circle cx="80" cy="40" r="2" fill="#FF9933" />
      </svg>
      
      {showText && (
        <div className="flex flex-col justify-center">
          <span className={`font-bold leading-none tracking-tight text-white ${textSize === 'lg' ? 'text-2xl' : textSize === 'md' ? 'text-xl' : 'text-lg'}`}>
            Civil
          </span>
          <span className={`font-bold text-saffron uppercase tracking-widest leading-none ${textSize === 'lg' ? 'text-sm' : textSize === 'md' ? 'text-[10px]' : 'text-[8px]'}`}>
            Margdarshan
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;