'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface LinerButtonProps {
  children: ReactNode;
  variant?: 'filled' | 'outline';
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function LinerButton({
  children,
  variant = 'filled',
  href,
  type = 'button',
  disabled = false,
  onClick,
  className = '',
}: LinerButtonProps) {
  const baseStyles = "relative overflow-hidden px-10 py-4 rounded-full font-medium transition-all duration-300 cursor-pointer";
  
  const filledStyles = {
    backgroundColor: 'var(--primary)',
    color: 'var(--background)',
  };
  
  const outlineStyles = {
    backgroundColor: 'transparent',
    border: '1px solid var(--primary)',
    color: 'var(--primary)',
  };

  const content = (
    <>
      {/* Animated liner effect */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: variant === 'filled' 
            ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
            : 'linear-gradient(90deg, transparent, var(--primary), transparent)',
          width: '50%',
        }}
        animate={{
          x: ['-100%', '300%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 1,
        }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${className}`}
        style={variant === 'filled' ? filledStyles : outlineStyles}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${className} disabled:opacity-50`}
      style={variant === 'filled' ? filledStyles : outlineStyles}
    >
      {content}
    </motion.button>
  );
}
