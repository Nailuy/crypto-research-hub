'use client';

import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    gradient?: boolean;
}

export default function Card({ children, className = '', hover = false, gradient = false }: CardProps) {
    return (
        <div className={`card ${hover ? 'glass-hover' : ''} ${gradient ? 'gradient-border' : 'glass'} ${className}`}>
            {children}

            <style jsx>{`
        .card {
          padding: var(--spacing-lg);
          border-radius: var(--radius-md);
          transition: var(--transition-normal);
        }

        .card.glass {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
        }
      `}</style>
        </div>
    );
}
