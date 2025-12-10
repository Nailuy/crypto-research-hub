'use client';

import { StablecoinData, calculateDepeg, getDepegStatus } from '@/lib/api/coingecko';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

interface StablecoinCardProps {
    coin: StablecoinData;
}

export default function StablecoinCard({ coin }: StablecoinCardProps) {
    const depeg = calculateDepeg(coin.current_price);
    const depegStatus = getDepegStatus(depeg);
    const isPositive = coin.price_change_percentage_24h >= 0;

    return (
        <div className={`stablecoin-card glass-hover ${depegStatus}`}>
            <div className="card-header">
                <div className="coin-info">
                    <img src={coin.image} alt={coin.name} className="coin-logo" />
                    <div className="coin-names">
                        <h3 className="coin-name">{coin.name}</h3>
                        <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                    </div>
                </div>
                <div className="depeg-badge">
                    {depegStatus === 'safe' && <CheckCircle size={16} />}
                    {depegStatus !== 'safe' && <AlertTriangle size={16} />}
                </div>
            </div>

            <div className="price-section">
                <div className="price-display">
                    <span className="price">${coin.current_price.toFixed(4)}</span>
                    <span className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
                        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                    </span>
                </div>
                <div className="depeg-display">
                    <span className="depeg-label">Depeg:</span>
                    <span className={`depeg-value ${depegStatus}`}>
                        {depeg >= 0 ? '+' : ''}{depeg.toFixed(3)}%
                    </span>
                </div>
            </div>

            <div className="metrics-grid">
                <div className="metric">
                    <span className="metric-label">Market Cap</span>
                    <span className="metric-value">
                        ${(coin.market_cap / 1_000_000_000).toFixed(2)}B
                    </span>
                </div>
                <div className="metric">
                    <span className="metric-label">24h Volume</span>
                    <span className="metric-value">
                        ${(coin.total_volume / 1_000_000).toFixed(0)}M
                    </span>
                </div>
                <div className="metric">
                    <span className="metric-label">Supply</span>
                    <span className="metric-value">
                        {(coin.circulating_supply / 1_000_000_000).toFixed(2)}B
                    </span>
                </div>
                <div className="metric">
                    <span className="metric-label">Rank</span>
                    <span className="metric-value">#{coin.market_cap_rank}</span>
                </div>
            </div>

            <style jsx>{`
        .stablecoin-card {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          transition: var(--transition-normal);
        }

        .stablecoin-card.warning {
          border-color: rgba(255, 184, 0, 0.3);
        }

        .stablecoin-card.danger {
          border-color: rgba(255, 51, 102, 0.3);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-md);
        }

        .coin-info {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .coin-logo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          padding: 2px;
        }

        .coin-names {
          display: flex;
          flex-direction: column;
        }

        .coin-name {
          font-size: 1.125rem;
          font-weight: 700;
          margin: 0;
          color: var(--text-primary);
        }

        .coin-symbol {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .depeg-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-tertiary);
        }

        .stablecoin-card.safe .depeg-badge {
          color: var(--success);
          background: rgba(0, 255, 136, 0.1);
        }

        .stablecoin-card.warning .depeg-badge {
          color: var(--warning);
          background: rgba(255, 184, 0, 0.1);
        }

        .stablecoin-card.danger .depeg-badge {
          color: var(--danger);
          background: rgba(255, 51, 102, 0.1);
        }

        .price-section {
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-md);
          border-bottom: 1px solid var(--border-color);
        }

        .price-display {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-xs);
        }

        .price {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .price-change {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
        }

        .price-change.positive {
          color: var(--success);
          background: rgba(0, 255, 136, 0.1);
        }

        .price-change.negative {
          color: var(--danger);
          background: rgba(255, 51, 102, 0.1);
        }

        .depeg-display {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .depeg-label {
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .depeg-value {
          font-size: 0.9375rem;
          font-weight: 700;
        }

        .depeg-value.safe {
          color: var(--success);
        }

        .depeg-value.warning {
          color: var(--warning);
        }

        .depeg-value.danger {
          color: var(--danger);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-md);
        }

        .metric {
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
      `}</style>
        </div>
    );
}
