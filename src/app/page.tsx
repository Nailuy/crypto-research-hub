'use client';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import {
  TrendingUp,
  DollarSign,
  Activity,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from 'lucide-react';

const stats = [
  {
    label: 'Total Market Cap',
    value: '$2.87T',
    change: '+5.2%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    label: 'Stablecoins Tracked',
    value: '12',
    change: '+2',
    trend: 'up',
    icon: DollarSign,
  },
  {
    label: 'DeFi Protocols',
    value: '48',
    change: '+8',
    trend: 'up',
    icon: Activity,
  },
  {
    label: 'Research Notes',
    value: '127',
    change: '+15',
    trend: 'up',
    icon: FileText,
  },
];

const recentActivity = [
  {
    title: 'USDC Depeg Alert',
    description: 'Minor deviation detected: -0.15%',
    time: '2 hours ago',
    type: 'warning',
  },
  {
    title: 'New DeFi Protocol Added',
    description: 'Pendle Finance added to tracking',
    time: '5 hours ago',
    type: 'success',
  },
  {
    title: 'Research Note Created',
    description: 'FHE Implementation Strategies',
    time: '1 day ago',
    type: 'info',
  },
  {
    title: 'Thread Analyzed',
    description: 'Vitalik Buterin on ZK-SNARKs',
    time: '2 days ago',
    type: 'info',
  },
];

const quickLinks = [
  { name: 'Stablecoin Dashboard', href: '/stablecoins', color: 'cyan' },
  { name: 'DeFi Comparisons', href: '/defi', color: 'purple' },
  { name: 'Create Note', href: '/notes', color: 'green' },
  { name: 'Analyze Thread', href: '/threads', color: 'orange' },
];

export default function Home() {
  return (
    <>
      <Sidebar />
      <main className="main-content">
        <Header
          title="Dashboard"
          subtitle="Welcome back, Yulian! Here's what's happening with your research."
        />

        <div className="content-wrapper">
          {/* Hero Section */}
          <section className="hero-section fade-in">
            <div className="hero-content">
              <div className="hero-badge">
                <Sparkles size={16} />
                <span>Web3 Research Platform</span>
              </div>
              <h1 className="hero-title">
                Crypto Research Hub
              </h1>
              <p className="hero-description">
                Your comprehensive platform for stablecoin analytics, DeFi protocol comparisons,
                and blockchain research. Stay ahead with real-time data and powerful insights.
              </p>
            </div>
          </section>

          {/* Stats Grid */}
          <section className="stats-grid">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} hover className="stat-card">
                  <div className="stat-header">
                    <div className="stat-icon">
                      <Icon size={24} />
                    </div>
                    <span className={`stat-change ${stat.trend}`}>
                      {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {stat.change}
                    </span>
                  </div>
                  <div className="stat-content">
                    <h3 className="stat-value">{stat.value}</h3>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                </Card>
              );
            })}
          </section>

          {/* Main Grid */}
          <div className="dashboard-grid">
            {/* Quick Links */}
            <Card className="quick-links-card">
              <h3 className="section-title">Quick Actions</h3>
              <div className="quick-links">
                {quickLinks.map((link) => (
                  <a key={link.name} href={link.href} className={`quick-link ${link.color}`}>
                    <span>{link.name}</span>
                    <ArrowUpRight size={18} />
                  </a>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="activity-card">
              <h3 className="section-title">Recent Activity</h3>
              <div className="activity-list">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className={`activity-indicator ${activity.type}`}></div>
                    <div className="activity-content">
                      <h4 className="activity-title">{activity.title}</h4>
                      <p className="activity-description">{activity.description}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>

      <style jsx>{`
        .main-content {
          margin-left: 280px;
          min-height: 100vh;
          background: var(--bg-primary);
        }

        .content-wrapper {
          padding: var(--spacing-xl);
          max-width: 1400px;
          margin: 0 auto;
        }

        .hero-section {
          margin-bottom: var(--spacing-xl);
          text-align: center;
          padding: var(--spacing-xl) 0;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: 0.5rem 1rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 2rem;
          font-size: 0.875rem;
          color: var(--accent-primary);
          margin-bottom: var(--spacing-md);
          backdrop-filter: blur(12px);
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: var(--spacing-md);
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.125rem;
          color: var(--text-secondary);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.8;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-xl);
        }

        .stat-card {
          animation: fadeIn 0.5s ease-out;
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-md);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
        }

        .stat-change {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
        }

        .stat-change.up {
          color: var(--success);
          background: rgba(0, 255, 136, 0.1);
        }

        .stat-change.down {
          color: var(--danger);
          background: rgba(255, 51, 102, 0.1);
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          margin: 0 0 0.25rem 0;
          color: var(--text-primary);
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin: 0;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: var(--spacing-lg);
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 var(--spacing-md) 0;
          color: var(--text-primary);
        }

        .quick-links {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .quick-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          font-weight: 500;
          transition: var(--transition-normal);
        }

        .quick-link:hover {
          transform: translateX(4px);
          border-color: var(--glass-border);
          background: var(--glass-bg);
        }

        .quick-link.cyan:hover {
          border-color: var(--accent-primary);
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.2);
        }

        .quick-link.purple:hover {
          border-color: var(--accent-secondary);
          box-shadow: 0 0 20px rgba(181, 55, 255, 0.2);
        }

        .quick-link.green:hover {
          border-color: var(--success);
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.2);
        }

        .quick-link.orange:hover {
          border-color: var(--warning);
          box-shadow: 0 0 20px rgba(255, 184, 0, 0.2);
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .activity-item {
          display: flex;
          gap: var(--spacing-md);
          padding-bottom: var(--spacing-md);
          border-bottom: 1px solid var(--border-color);
        }

        .activity-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .activity-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
        }

        .activity-indicator.success {
          background: var(--success);
          box-shadow: 0 0 8px var(--success);
        }

        .activity-indicator.warning {
          background: var(--warning);
          box-shadow: 0 0 8px var(--warning);
        }

        .activity-indicator.info {
          background: var(--accent-primary);
          box-shadow: 0 0 8px var(--accent-primary);
        }

        .activity-content {
          flex: 1;
        }

        .activity-title {
          font-size: 0.9375rem;
          font-weight: 600;
          margin: 0 0 0.25rem 0;
          color: var(--text-primary);
        }

        .activity-description {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin: 0 0 0.5rem 0;
        }

        .activity-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 70px;
          }

          .content-wrapper {
            padding: var(--spacing-md);
          }

          .hero-title {
            font-size: 2rem;
          }

          .stats-grid,
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
