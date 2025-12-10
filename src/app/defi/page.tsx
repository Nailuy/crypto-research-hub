'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ProtocolCard from '@/components/defi/ProtocolCard';
import { getAllProtocols, Protocol, PROTOCOL_CATEGORIES } from '@/lib/api/defillama';
import { Search, Filter, TrendingUp } from 'lucide-react';

export default function DeFiPage() {
    const [protocols, setProtocols] = useState<Protocol[]>([]);
    const [filteredProtocols, setFilteredProtocols] = useState<Protocol[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState<'tvl' | 'change'>('tvl');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getAllProtocols();
            // Get top 50 protocols by TVL
            const topProtocols = data
                .sort((a, b) => b.tvl - a.tvl)
                .slice(0, 50);
            setProtocols(topProtocols);
            setFilteredProtocols(topProtocols);
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filtered = [...protocols];

        // Filter by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.symbol?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort
        filtered.sort((a, b) => {
            if (sortBy === 'tvl') {
                return b.tvl - a.tvl;
            } else {
                return (b.change_1d || 0) - (a.change_1d || 0);
            }
        });

        setFilteredProtocols(filtered);
    }, [protocols, selectedCategory, searchQuery, sortBy]);

    const totalTVL = protocols.reduce((sum, p) => sum + p.tvl, 0);

    return (
        <>
            <Sidebar />
            <main className="main-content">
                <Header
                    title="DeFi Protocols"
                    subtitle="Compare and analyze DeFi protocols across chains"
                />

                <div className="content-wrapper">
                    {/* Summary */}
                    <div className="summary-section glass">
                        <div className="summary-stat">
                            <TrendingUp size={32} />
                            <div>
                                <span className="summary-label">Total TVL</span>
                                <h3 className="summary-value">
                                    ${(totalTVL / 1_000_000_000).toFixed(2)}B
                                </h3>
                            </div>
                        </div>
                        <div className="summary-stat">
                            <Filter size={32} />
                            <div>
                                <span className="summary-label">Protocols Shown</span>
                                <h3 className="summary-value">{filteredProtocols.length}</h3>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="filters-section glass">
                        <div className="search-container">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search protocols..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <div className="category-filters">
                            {PROTOCOL_CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        <div className="sort-controls">
                            <span className="sort-label">Sort by:</span>
                            <button
                                className={`sort-button ${sortBy === 'tvl' ? 'active' : ''}`}
                                onClick={() => setSortBy('tvl')}
                            >
                                TVL
                            </button>
                            <button
                                className={`sort-button ${sortBy === 'change' ? 'active' : ''}`}
                                onClick={() => setSortBy('change')}
                            >
                                24h Change
                            </button>
                        </div>
                    </div>

                    {/* Protocols Grid */}
                    {loading ? (
                        <div className="loading-grid">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="skeleton-card"></div>
                            ))}
                        </div>
                    ) : filteredProtocols.length === 0 ? (
                        <div className="empty-state glass">
                            <p>No protocols found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="protocols-grid">
                            {filteredProtocols.map((protocol) => (
                                <ProtocolCard key={protocol.id} protocol={protocol} />
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
          max-width: 1600px;
          margin: 0 auto;
        }

        .summary-section {
          display: flex;
          gap: var(--spacing-xl);
          padding: var(--spacing-xl);
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-lg);
        }

        .summary-stat {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .summary-stat :global(svg) {
          color: var(--accent-primary);
        }

        .summary-label {
          font-size: 0.875rem;
          color: var(--text-muted);
          display: block;
          margin-bottom: 0.25rem;
        }

        .summary-value {
          font-size: 2rem;
          font-weight: 800;
          margin: 0;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .filters-section {
          padding: var(--spacing-lg);
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-lg);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .search-container {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-sm) var(--spacing-md);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          transition: var(--transition-fast);
        }

        .search-container:focus-within {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(0, 217, 255, 0.1);
        }

        .search-container :global(svg) {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 0.9375rem;
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .category-filters {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
        }

        .category-button {
          padding: 0.5rem 1rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 600;
          transition: var(--transition-fast);
        }

        .category-button:hover {
          background: var(--glass-bg);
          color: var(--text-primary);
        }

        .category-button.active {
          background: var(--accent-primary);
          color: var(--bg-primary);
          border-color: var(--accent-primary);
        }

        .sort-controls {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .sort-label {
          font-size: 0.875rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .sort-button {
          padding: 0.5rem 1rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 600;
          transition: var(--transition-fast);
        }

        .sort-button:hover {
          background: var(--glass-bg);
          color: var(--text-primary);
        }

        .sort-button.active {
          background: var(--glass-bg);
          color: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        .protocols-grid {
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
          height: 350px;
          border-radius: var(--radius-md);
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          animation: pulse 1.5s ease-in-out infinite;
        }

        .empty-state {
          padding: var(--spacing-xl);
          text-align: center;
          border-radius: var(--radius-md);
        }

        .empty-state p {
          color: var(--text-muted);
          font-size: 1.125rem;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 70px;
          }

          .content-wrapper {
            padding: var(--spacing-md);
          }

          .summary-section {
            flex-direction: column;
            gap: var(--spacing-md);
          }

          .category-filters {
            max-height: 200px;
            overflow-y: auto;
          }

          .protocols-grid,
          .loading-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </>
    );
}
