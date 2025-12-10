'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import StablecoinCard from '@/components/stablecoins/StablecoinCard';
import { getStablecoins, StablecoinData } from '@/lib/api/coingecko';
import { RefreshCw, AlertTriangle, TrendingUp } from 'lucide-react';

export default function StablecoinsPage() {
    const [stablecoins, setStablecoins] = useState<StablecoinData[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

    const fetchData = async () => {
        setLoading(true);
        const data = await getStablecoins();
        setStablecoins(data);
        setLastUpdate(new Date());
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
        // Auto-refresh every 60 seconds
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, []);

    const totalMarketCap = stablecoins.reduce((sum, coin) => sum + coin.market_cap, 0);
    const avgDepeg = stablecoins.reduce((sum, coin) => {
        return sum + Math.abs(((coin.current_price - 1) / 1) * 100);
    }, 0) / (stablecoins.length || 1);

    return (
        <>
            <Sidebar />
            <main className="main-content">
                <Header
                    title="Stablecoin Analytics"
                    subtitle="Real-time monitoring and depeg detection"
                />

                <div className="content-wrapper">
                    {/* Summary Cards */}
                    <div className="summary-grid">
                        <div className="summary-card glass">
                            <div className="summary-icon">
                                <TrendingUp size={24} />
                            </div>
                            <div className="summary-content">
                                <span className="summary-label">Total Market Cap</span>
                                <h3 className="summary-value">
                                    ${(totalMarketCap / 1_000_000_000).toFixed(2)}B
                                </h3>
                            </div>
                        </div>

                        <div className="summary-card glass">
                            <div className="summary-icon">
                                <AlertTriangle size={24} />
                            </div>
                            <div className="summary-content">
                                <span className="summary-label">Avg Depeg</span>
                                <h3 className="summary-value">{avgDepeg.toFixed(3)}%</h3>
                            </div>
                        </div>

                        <div className="summary-card glass">
                            <div className="summary-icon">
                                <RefreshCw size={24} />
                            </div>
                            <div className="summary-content">
                                <span className="summary-label">Stablecoins Tracked</span>
                                <h3 className="summary-value">{stablecoins.length}</h3>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="controls">
                        <div className="last-update">
                            {lastUpdate && (
                                <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
                            )}
                        </div>
                        <button
                            className="refresh-button"
                            onClick={fetchData}
                            disabled={loading}
                        >
                            <RefreshCw size={18} className={loading ? 'spinning' : ''} />
                            Refresh Data
                        </button>
                    </div>

                    {/* Stablecoins Grid */}
                    {loading && stablecoins.length === 0 ? (
                        <div className="loading-grid">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="skeleton-card"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="stablecoins-grid">
                            {stablecoins.map((coin) => (
                                <StablecoinCard key={coin.id} coin={coin} />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <style jsx>{`
        .main-content {
          margin-left: 280px;
          min-height: 100vh;
        }

        .content-wrapper {
          padding: var(--spacing-xl);
          max-width: 1400px;
          margin: 0 auto;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-xl);
        }

        .summary-card {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-lg);
          border-radius: var(--radius-md);
        }

        .summary-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
          flex-shrink: 0;
        }

        .summary-content {
          display: flex;
          flex-direction: column;
        }

        .summary-label {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
        }

        .summary-value {
          font-size: 1.75rem;
          font-weight: 800;
          margin: 0;
          color: var(--text-primary);
        }

        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
          padding: var(--spacing-md);
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          backdrop-filter: blur(12px);
        }

        .last-update {
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .refresh-button {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: 0.75rem 1.5rem;
          background: var(--accent-primary);
          color: var(--bg-primary);
          border-radius: var(--radius-sm);
          font-weight: 600;
          font-size: 0.875rem;
          transition: var(--transition-normal);
        }

        .refresh-button:hover:not(:disabled) {
          background: var(--accent-secondary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .refresh-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .refresh-button :global(.spinning) {
          animation: spin 1s linear infinite;
        }

        .stablecoins-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: var(--spacing-lg);
          animation: fadeIn 0.5s ease-out;
        }

        .loading-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: var(--spacing-lg);
        }

        .skeleton-card {
          height: 300px;
          border-radius: var(--radius-md);
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          animation: pulse 1.5s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 70px;
          }

          .content-wrapper {
            padding: var(--spacing-md);
          }

          .summary-grid,
          .stablecoins-grid,
          .loading-grid {
            grid-template-columns: 1fr;
          }

          .controls {
            flex-direction: column;
            gap: var(--spacing-sm);
            align-items: stretch;
          }

          .refresh-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
        </>
    );
}
