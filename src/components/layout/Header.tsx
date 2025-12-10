'use client';

import { Search, Bell, Settings } from 'lucide-react';

interface HeaderProps {
    title?: string;
    subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
    return (
        <header className="header">
            <div className="header-content">
                <div className="header-titles">
                    {title && <h2 className="header-title">{title}</h2>}
                    {subtitle && <p className="header-subtitle">{subtitle}</p>}
                </div>

                <div className="header-actions">
                    <div className="search-box">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="search-input"
                        />
                    </div>

                    <button className="icon-button" aria-label="Notifications">
                        <Bell size={20} />
                        <span className="notification-badge">3</span>
                    </button>

                    <button className="icon-button" aria-label="Settings">
                        <Settings size={20} />
                    </button>
                </div>
            </div>

            <style jsx>{`
        .header {
          position: sticky;
          top: 0;
          background: rgba(10, 14, 26, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-color);
          padding: var(--spacing-md) var(--spacing-lg);
          z-index: 50;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-md);
        }

        .header-titles {
          flex: 1;
        }

        .header-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0;
          color: var(--text-primary);
        }

        .header-subtitle {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin: 0.25rem 0 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 0.5rem 1rem;
          transition: var(--transition-fast);
        }

        .search-box:focus-within {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(0, 217, 255, 0.1);
        }

        .search-box :global(svg) {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .search-input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 0.875rem;
          width: 200px;
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .icon-button {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .icon-button:hover {
          background: var(--glass-bg);
          border-color: var(--glass-border);
          color: var(--accent-primary);
          transform: translateY(-2px);
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--danger);
          color: white;
          font-size: 0.625rem;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--bg-primary);
        }

        @media (max-width: 768px) {
          .header {
            padding: var(--spacing-sm) var(--spacing-md);
          }

          .header-title {
            font-size: 1.25rem;
          }

          .search-box {
            display: none;
          }

          .header-subtitle {
            display: none;
          }
        }
      `}</style>
        </header>
    );
}
