import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('EXPLORE');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable custom cursor on mobile touch screens
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, select, textarea, .organic-card, .organic-card-forest, [data-cursor], [data-cursor-text]');
      if (target) {
        setIsHovered(true);
        const customText = target.getAttribute('data-cursor') || target.getAttribute('data-cursor-text');
        setHoverText(customText || 'VIEW →');
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-all duration-100 ease-out hidden md:block"
      style={{
        left: `${mousePos.x}px`,
        top: `${mousePos.y}px`,
      }}
    >
      <div className="relative">
        {/* Playful Hand-Drawn Arrow Pointer */}
        <div 
          className={`transition-transform duration-200 ${
            isHovered ? 'scale-125 -translate-x-1 -translate-y-1' : 'scale-100'
          }`}
        >
          <svg 
            width="22" 
            height="22" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-sm"
          >
            <path 
              d="M3.5 3.5L10.5 20.5L14 13.5L20.5 10L3.5 3.5Z" 
              fill={isHovered ? "#32C6BE" : "#123C36"} 
              stroke="#FFFDF7" 
              strokeWidth="2" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>

        {/* Small Turquoise Glow Ring on Hover */}
        {isHovered && (
          <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full border-2 border-[#32C6BE] animate-ping opacity-60 pointer-events-none" />
        )}

        {/* Floating Action Badge on Hover */}
        {isHovered && (
          <div className="absolute left-6 top-3 bg-[#123C36] text-[#32C6BE] px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-full border border-[#32C6BE] whitespace-nowrap shadow-md">
            {hoverText}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCursor;
