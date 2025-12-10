'use client';

import { Protocol, formatTVL } from '@/lib/api/defillama';
import { ExternalLink, TrendingUp, TrendingDown, Shield } from 'lucide-react';

interface ProtocolCardProps {
    protocol: Protocol;
}

export default function ProtocolCard({ protocol }: ProtocolCardProps) {
    const change1d = protocol.change_1d || 0;
    const isPositive = change1d >= 0;

    return (
        <div className="protocol-card glass-hover">
            <div className="card-header">
                <div className="protocol-info">
                    <div className="logo-container">
                        {protocol.logo ? (
                            <img src={protocol.logo} alt={protocol.name} className="protocol-logo" />
                        ) : (
                            <div className="protocol-logo-placeholder">{protocol.name[0]}</div>
                        )}
                    </div>
                    <div className="protocol-names">
                        <h3 className="protocol-name">{protocol.name}</h3>
                        <span className="protocol-category">{protocol.category}</span>
                    </div>
                </div>
                {protocol.audits && (
                    <div className="audit-badge" title="Audited">
                        <Shield size={16} />
                    </div>
                )}
            </div>

            <div className="tvl-section">
                <span className="tvl-label">Total Value Locked</span>
                <div className="tvl-display">
                    <h4 className="tvl-value">{formatTVL(protocol.tvl)}</h4>
                    {change1d !== 0 && (
                        <span className={`tvl-change ${isPositive ? 'positive' : 'negative'}`}>
                            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            {Math.abs(change1d).toFixed(2)}%
                        </span>
                    )}
                </div>
            </div>

            <div className="chains-section">
                <span className="chains-label">Chains</span>
                <div className="chains-list">
                    {protocol.chains.slice(0, 3).map((chain) => (
                        <span key={chain} className="chain-badge">
                            {chain}
                        </span>
                    ))}
                    {protocol.chains.length > 3 && (
                        <span className="chain-badge more">+{protocol.chains.length - 3}</span>
                    )}
                </div>
            </div>

            <div className="metrics-row">
                {protocol.mcap && (
                    <div className="metric">
                        <span className="metric-label">Market Cap</span>
                        <span className="metric-value">{formatTVL(protocol.mcap)}</span>
                    </div>
                )}
                {protocol.staking && (
                    <div className="metric">
                        <span className="metric-label">Staking</span>
                        <span className="metric-value">{formatTVL(protocol.staking)}</span>
                    </div>
                )}
            </div>

            <div className="card-footer">
                {protocol.url && (
                    <a
                        href={protocol.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="external-link"
                    >
                        <span>Visit Protocol</span>
                        <ExternalLink size={14} />
                    </a>
                )}
            </div>

            <style jsx>{`
        .protocol-card {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          transition: var(--transition-normal);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .protocol-info {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          flex: 1;
        }

        .logo-container {
          flex-shrink: 0;
        }

        .protocol-logo {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          object-fit: contain;
          padding: 4px;
        }

        .protocol-logo-placeholder {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.5rem;
        }

        .protocol-names {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .protocol-name {
          font-size: 1.125rem;
          font-weight: 700;
          margin: 0;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .protocol-category {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .audit-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(0, 255, 136, 0.1);
          color: var(--success);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .tvl-section {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .tvl-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .tvl-display {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .tvl-value {
          font-size: 1.75rem;
          font-weight: 800;
          margin: 0;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .tvl-change {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
        }

        .tvl-change.positive {
          color: var(--success);
          background: rgba(0, 255, 136, 0.1);
        }

        .tvl-change.negative {
          color: var(--danger);
          background: rgba(255, 51, 102, 0.1);
        }

        .chains-section {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .chains-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .chains-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .chain-badge {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .chain-badge.more {
          background: var(--glass-bg);
          color: var(--accent-primary);
        }

        .metrics-row {
          display: flex;
          gap: var(--spacing-md);
          padding-top: var(--spacing-sm);
          border-top: 1px solid var(--border-color);
        }

        .metric {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .metric-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .metric-value {
          font-size: 0.9375rem;
          color: var(--text-primary);
          font-weight: 600;
        }

        .card-footer {
          padding-top: var(--spacing-sm);
          border-top: 1px solid var(--border-color);
        }

        .external-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--accent-primary);
          transition: var(--transition-fast);
        }

        .external-link:hover {
          background: var(--glass-bg);
          border-color: var(--accent-primary);
          transform: translateX(4px);
        }
      `}</style>
        </div>
    );
}
