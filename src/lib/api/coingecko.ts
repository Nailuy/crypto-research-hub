// CoinGecko API Integration
// Free API - No key required

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

export interface StablecoinData {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    total_volume: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    circulating_supply: number;
    image: string;
    last_updated: string;
}

// Top stablecoins to track
const STABLECOINS = [
    'tether',
    'usd-coin',
    'dai',
    'first-digital-usd',
    'true-usd',
    'pax-dollar',
    'gemini-dollar',
    'liquity-usd',
    'frax',
    'usdd',
    'tribe-2',
    'alchemix-usd',
];

export async function getStablecoins(): Promise<StablecoinData[]> {
    try {
        const ids = STABLECOINS.join(',');
        const response = await fetch(
            `${COINGECKO_BASE_URL}/coins/markets?` +
            `vs_currency=usd&ids=${ids}&` +
            `order=market_cap_desc&` +
            `per_page=50&page=1&` +
            `sparkline=false&` +
            `price_change_percentage=24h,7d`,
            {
                next: { revalidate: 60 } // Cache for 60 seconds
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch stablecoin data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching stablecoins:', error);
        return [];
    }
}

export async function getStablecoinChart(coinId: string, days: number = 7): Promise<any> {
    try {
        const response = await fetch(
            `${COINGECKO_BASE_URL}/coins/${coinId}/market_chart?` +
            `vs_currency=usd&days=${days}&interval=hourly`,
            {
                next: { revalidate: 300 } // Cache for 5 minutes
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch chart data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching chart data:', error);
        return null;
    }
}

export function calculateDepeg(price: number): number {
    return ((price - 1) / 1) * 100;
}

export function getDepegStatus(depeg: number): 'safe' | 'warning' | 'danger' {
    const absDepeg = Math.abs(depeg);
    if (absDepeg < 0.1) return 'safe';
    if (absDepeg < 0.5) return 'warning';
    return 'danger';
}
