'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    DollarSign,
    Activity,
    FileText,
    Twitter,
    Shield
} from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Stablecoins', href: '/stablecoins', icon: DollarSign },
    { name: 'DeFi Protocols', href: '/defi', icon: Activity },
    { name: 'Research Notes', href: '/notes', icon: FileText },
    { name: 'Thread Analyzer', href: '/threads', icon: Twitter },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <Shield className="logo-icon" size={32} />
                    <div className="logo-text">
                        <h1 className="logo-title">Crypto Research</h1>
                        <p className="logo-subtitle">Web3 Analytics</p>
                    </div>
                </div>
            </div>

            <nav className="sidebar-nav">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="sidebar-footer">
                <div className="user-profile">
                    <div className="user-avatar">Y</div>
                    <div className="user-info">
                        <p className="user-name">Nailuy</p>
                        <p className="user-role">Researcher</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          width: 280px;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          z-index: 100;
          overflow-y: auto;
        }

        .sidebar-header {
          padding: var(--spacing-lg);
          border-bottom: 1px solid var(--border-color);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .logo-icon {
          color: var(--accent-primary);
          flex-shrink: 0;
        }

        .logo-text {
          overflow: hidden;
        }

        .logo-title {
          font-size: 1.25rem;
          font-weight: 800;
          margin: 0;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-subtitle {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin: 0;
          font-weight: 500;
        }

        .sidebar-nav {
          flex: 1;
          padding: var(--spacing-md);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-weight: 500;
          transition: var(--transition-fast);
          position: relative;
          overflow: hidden;
        }

        .nav-item:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          transform: translateX(4px);
        }

        .nav-item.active {
          background: var(--glass-bg);
          color: var(--accent-primary);
          border: 1px solid var(--glass-border);
        }

        .nav-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--accent-gradient);
        }

        .sidebar-footer {
          padding: var(--spacing-md);
          border-top: 1px solid var(--border-color);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          transition: var(--transition-fast);
          cursor: pointer;
        }

        .user-profile:hover {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.125rem;
          flex-shrink: 0;
        }

        .user-info {
          overflow: hidden;
        }

        .user-name {
          font-weight: 600;
          font-size: 0.875rem;
          margin: 0;
          color: var(--text-primary);
        }

        .user-role {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin: 0;
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 70px;
          }

          .logo-text,
          .nav-item span,
          .user-info {
            display: none;
          }

          .sidebar-header {
            padding: var(--spacing-md);
          }

          .logo {
            justify-content: center;
          }

          .nav-item {
            justify-content: center;
          }

          .user-profile {
            justify-content: center;
          }
        }
      `}</style>
        </aside>
    );
}
