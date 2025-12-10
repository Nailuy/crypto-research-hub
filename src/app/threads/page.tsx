'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Twitter, Sparkles, Copy, Check, Download } from 'lucide-react';

interface ThreadAnalysis {
    tweets: string[];
    keyPoints: string[];
    summary: string;
    wordCount: number;
    sentiment: 'positive' | 'neutral' | 'negative';
}

export default function ThreadsPage() {
    const [input, setInput] = useState('');
    const [analysis, setAnalysis] = useState<ThreadAnalysis | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const analyzeThread = () => {
        if (!input.trim()) return;

        setLoading(true);

        // Simulate analysis (since we don't have Twitter API)
        setTimeout(() => {
            const tweets = input
                .split('\n\n')
                .filter(t => t.trim().length > 0)
                .map(t => t.trim());

            const allText = tweets.join(' ');
            const wordCount = allText.split(/\s+/).length;

            // Simple key points extraction
            const keyPoints = tweets
                .filter(t => t.length > 50)
                .slice(0, 5)
                .map(t => t.substring(0, 100) + (t.length > 100 ? '...' : ''));

            // Simple summary
            const summary = tweets[0]?.substring(0, 200) + (tweets[0]?.length > 200 ? '...' : '');

            // Simple sentiment
            const positiveWords = (allText.match(/\b(great|good|excellent|amazing|awesome|bullish|up|growth)\b/gi) || []).length;
            const negativeWords = (allText.match(/\b(bad|terrible|awful|bearish|down|crash|fail)\b/gi) || []).length;

            let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
            if (positiveWords > negativeWords + 2) sentiment = 'positive';
            if (negativeWords > positiveWords + 2) sentiment = 'negative';

            setAnalysis({
                tweets,
                keyPoints,
                summary,
                wordCount,
                sentiment,
            });

            setLoading(false);
        }, 1000);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadAnalysis = () => {
        if (!analysis) return;

        const content = `
# Thread Analysis

## Summary
${analysis.summary}

## Key Points
${analysis.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}

## Statistics
- Word Count: ${analysis.wordCount}
- Tweets: ${analysis.tweets.length}
- Sentiment: ${analysis.sentiment}

## Full Thread
${analysis.tweets.map((t, i) => `${i + 1}. ${t}`).join('\n\n')}
    `.trim();

        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'thread-analysis.md';
        a.click();
    };

    return (
        <>
            <Sidebar />
            <main className="main-content">
                <Header
                    title="Twitter/X Thread Analyzer"
                    subtitle="Extract insights from Twitter threads"
                />

                <div className="content-wrapper">
                    <div className="analyzer-grid">
                        {/* Input Section */}
                        <div className="input-section glass">
                            <div className="section-header">
                                <Twitter size={24} />
                                <h3>Thread Input</h3>
                            </div>

                            <textarea
                                className="thread-input"
                                placeholder="Paste your Twitter thread here...&#10;&#10;Separate each tweet with a blank line.&#10;&#10;Example:&#10;Tweet 1 content here&#10;&#10;Tweet 2 content here&#10;&#10;Tweet 3 content here"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />

                            <button
                                className="analyze-button"
                                onClick={analyzeThread}
                                disabled={!input.trim() || loading}
                            >
                                <Sparkles size={18} />
                                {loading ? 'Analyzing...' : 'Analyze Thread'}
                            </button>

                            <div className="input-tips">
                                <h4>Tips:</h4>
                                <ul>
                                    <li>Paste the full thread text</li>
                                    <li>Separate tweets with blank lines</li>
                                    <li>Works best with 3+ tweets</li>
                                    <li>No API key needed</li>
                                </ul>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="results-section">
                            {!analysis ? (
                                <div className="empty-results glass">
                                    <Sparkles size={64} />
                                    <h3>No Analysis Yet</h3>
                                    <p>Paste a thread and click "Analyze Thread" to get started</p>
                                </div>
                            ) : (
                                <>
                                    {/* Summary Card */}
                                    <div className="result-card glass">
                                        <div className="card-header">
                                            <h3>Summary</h3>
                                            <button
                                                className="icon-btn"
                                                onClick={() => copyToClipboard(analysis.summary)}
                                                title="Copy summary"
                                            >
                                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                            </button>
                                        </div>
                                        <p className="summary-text">{analysis.summary}</p>
                                    </div>

                                    {/* Stats Card */}
                                    <div className="result-card glass">
                                        <h3>Statistics</h3>
                                        <div className="stats-grid">
                                            <div className="stat">
                                                <span className="stat-label">Tweets</span>
                                                <span className="stat-value">{analysis.tweets.length}</span>
                                            </div>
                                            <div className="stat">
                                                <span className="stat-label">Words</span>
                                                <span className="stat-value">{analysis.wordCount}</span>
                                            </div>
                                            <div className="stat">
                                                <span className="stat-label">Sentiment</span>
                                                <span className={`stat-value sentiment-${analysis.sentiment}`}>
                                                    {analysis.sentiment}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Key Points Card */}
                                    <div className="result-card glass">
                                        <h3>Key Points</h3>
                                        <ul className="key-points-list">
                                            {analysis.keyPoints.map((point, index) => (
                                                <li key={index}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Full Thread Card */}
                                    <div className="result-card glass">
                                        <div className="card-header">
                                            <h3>Full Thread ({analysis.tweets.length} tweets)</h3>
                                            <button
                                                className="icon-btn"
                                                onClick={downloadAnalysis}
                                                title="Download analysis"
                                            >
                                                <Download size={16} />
                                            </button>
                                        </div>
                                        <div className="thread-list">
                                            {analysis.tweets.map((tweet, index) => (
                                                <div key={index} className="tweet-item">
                                                    <span className="tweet-number">{index + 1}</span>
                                                    <p className="tweet-text">{tweet}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
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

        .analyzer-grid {
          display: grid;
          grid-template-columns: 450px 1fr;
          gap: var(--spacing-lg);
          align-items: start;
        }

        .input-section {
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          position: sticky;
          top: var(--spacing-lg);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--accent-primary);
        }

        .section-header h3 {
          font-size: 1.25rem;
          margin: 0;
        }

        .thread-input {
          width: 100%;
          min-height: 300px;
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 0.9375rem;
          line-height: 1.6;
          resize: vertical;
          outline: none;
          transition: var(--transition-fast);
        }

        .thread-input:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(0, 217, 255, 0.1);
        }

        .analyze-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-md);
          background: var(--accent-gradient);
          color: white;
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 1rem;
          transition: var(--transition-normal);
        }

        .analyze-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg), var(--shadow-glow);
        }

        .analyze-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .input-tips {
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          border-left: 3px solid var(--accent-primary);
        }

        .input-tips h4 {
          font-size: 0.875rem;
          margin: 0 0 var(--spacing-sm) 0;
          color: var(--accent-primary);
        }

        .input-tips ul {
          margin: 0;
          padding-left: var(--spacing-md);
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .input-tips li {
          margin-bottom: 0.25rem;
        }

        .results-section {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .empty-results {
          padding: var(--spacing-xl);
          border-radius: var(--radius-md);
          text-align: center;
          color: var(--text-muted);
        }

        .empty-results :global(svg) {
          margin-bottom: var(--spacing-md);
          opacity: 0.3;
        }

        .empty-results h3 {
          margin-bottom: var(--spacing-sm);
        }

        .result-card {
          padding: var(--spacing-lg);
          border-radius: var(--radius-md);
          animation: fadeIn 0.5s ease-out;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-md);
        }

        .card-header h3 {
          font-size: 1.125rem;
          margin: 0;
          color: var(--text-primary);
        }

        .icon-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .icon-btn:hover {
          background: var(--glass-bg);
          color: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        .summary-text {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.8;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-md);
        }

        .stat {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .stat-value.sentiment-positive {
          color: var(--success);
        }

        .stat-value.sentiment-negative {
          color: var(--danger);
        }

        .stat-value.sentiment-neutral {
          color: var(--text-secondary);
        }

        .key-points-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .key-points-list li {
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border-left: 3px solid var(--accent-primary);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .thread-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          max-height: 600px;
          overflow-y: auto;
          padding-right: var(--spacing-xs);
        }

        .thread-list::-webkit-scrollbar {
          width: 6px;
        }

        .tweet-item {
          display: flex;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
        }

        .tweet-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--accent-gradient);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
          flex-shrink: 0;
        }

        .tweet-text {
          flex: 1;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 1200px) {
          .analyzer-grid {
            grid-template-columns: 1fr;
          }

          .input-section {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 70px;
          }

          .content-wrapper {
            padding: var(--spacing-md);
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </>
    );
}
