# 🔐 Crypto Research Hub

> **Comprehensive Web3 research platform for stablecoin analytics, DeFi protocol comparisons, and blockchain research.**

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

Built for cybersecurity professionals and blockchain researchers to analyze and track Web3 protocols with real-time data.

## ✨ Features

### 💰 Stablecoin Analytics
- **Real-time Price Tracking**: Live prices from CoinGecko API
- **Depeg Monitoring**: Automatic detection of price deviations from $1.00 peg
- **Color-coded Alerts**: Green (safe), Yellow (warning), Red (danger)
- **Market Metrics**: Market cap, 24h volume, circulating supply
- **Auto-refresh**: Updates every 60 seconds

### 🔄 DeFi Protocol Comparisons
- **50+ Protocols**: Top DeFi protocols from DeFiLlama
- **TVL Tracking**: Total Value Locked across chains
- **Advanced Filtering**: Search, category filters (Dexes, Lending, Yield, etc.)
- **Multi-chain Support**: View protocols across different blockchains
- **Audit Indicators**: Security audit status badges

### 📝 Research Notes Organizer
- **Markdown Editor**: Write notes with full Markdown support
- **Live Preview**: Toggle between edit and preview mode
- **Categories & Tags**: Organize by topic (Stablecoins, DeFi, Security, FHE, DePIN)
- **Local Storage**: Notes saved in browser (privacy-first)
- **Full-text Search**: Find notes instantly

### 🐦 Twitter/X Thread Analyzer
- **No API Required**: Works with pasted thread content
- **Key Points Extraction**: Automatically identifies important tweets
- **Sentiment Analysis**: Positive/Neutral/Negative detection
- **Statistics**: Word count, tweet count, engagement metrics
- **Export Options**: Download analysis as Markdown

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Nailuy/crypto-research-hub.git

# Navigate to project directory
cd crypto-research-hub

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Design

- **Dark Theme**: Optimized for extended research sessions
- **Glassmorphism**: Modern frosted glass UI effects
- **Gradient Accents**: Cyan to purple gradients
- **Responsive**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Polished user experience

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS with CSS-in-JS (styled-jsx)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Markdown**: React Markdown

### APIs
- **CoinGecko API**: Stablecoin data (free, no key required)
- **DeFiLlama API**: DeFi protocol data (free, no key required)

### Storage
- **LocalStorage**: Client-side note persistence

## 📁 Project Structure

```
crypto-research-hub/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Dashboard
│   │   ├── stablecoins/          # Stablecoin analytics
│   │   ├── defi/                 # DeFi protocols
│   │   ├── notes/                # Notes organizer
│   │   ├── threads/              # Thread analyzer
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── layout/               # Navigation components
│   │   ├── ui/                   # Reusable UI components
│   │   ├── stablecoins/          # Stablecoin components
│   │   └── defi/                 # DeFi components
│   └── lib/
│       ├── api/                  # API integrations
│       └── storage/              # Storage utilities
├── public/                       # Static assets
├── package.json
├── next.config.ts
└── tsconfig.json
```

## 🔌 API Integration

### CoinGecko
```typescript
// Fetches stablecoin market data
const data = await fetch(
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=...'
);
```

### DeFiLlama
```typescript
// Fetches DeFi protocol data
const protocols = await fetch('https://api.llama.fi/protocols');
```

## 📊 Features Overview

| Feature | Status | Notes |
|---------|--------|-------|
| Dashboard | ✅ | Real-time stats and quick links |
| Stablecoin Analytics | ✅ | 12+ stablecoins tracked |
| DeFi Protocols | ✅ | 50+ protocols monitored |
| Research Notes | ✅ | Markdown editor with tags |
| Thread Analyzer | ✅ | No Twitter API needed |
| Dark Theme | ✅ | Glassmorphism design |
| Responsive Design | ✅ | Mobile, tablet, desktop |
| TypeScript | ✅ | Full type safety |

## 🎯 Use Cases

- **Researchers**: Track stablecoin stability and DeFi metrics
- **Security Professionals**: Monitor protocol audits and vulnerabilities
- **Crypto Traders**: Analyze market trends and TVL changes
- **Developers**: Study protocol implementations and integrations
- **Educators**: Organize research notes and teaching materials

## 🔒 Privacy & Security

- ✅ No user authentication required
- ✅ No data sent to external servers
- ✅ Notes stored locally in browser
- ✅ No cookies or tracking
- ✅ Open source code

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker
```bash
# Build image
docker build -t crypto-research-hub .

# Run container
docker run -p 3000:3000 crypto-research-hub
```

### Manual Deployment
```bash
# Build
npm run build

# The .next folder contains the production build
# Deploy to any Node.js hosting platform
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yulian**
- Portfolio: [my-portfolio-2025-lake.vercel.app](https://my-portfolio-2025-lake.vercel.app/)
- Twitter: [@yulianvakh](https://x.com/yulianvakh)
- GitHub: [@Nailuy](https://github.com/Nailuy)

## 🙏 Acknowledgments

- [CoinGecko](https://www.coingecko.com/) for free stablecoin data API
- [DeFiLlama](https://defillama.com/) for DeFi protocol data
- [Next.js](https://nextjs.org/) for the amazing framework
- [Lucide](https://lucide.dev/) for beautiful icons

## 📈 Roadmap

- [ ] Price history charts
- [ ] Portfolio tracking
- [ ] Twitter API integration (optional)
- [ ] Cloud sync for notes
- [ ] Advanced analytics dashboard
- [ ] Export data to CSV/JSON
- [ ] Dark/Light theme toggle
- [ ] Multi-language support

---

<p align="center">
  Made with ❤️ for the Web3 community
</p>

<p align="center">
  <a href="https://github.com/Nailuy/crypto-research-hub/stargazers">⭐ Star this repo</a>
</p>
