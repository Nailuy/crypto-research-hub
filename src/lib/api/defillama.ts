// DeFiLlama API Integration
// Free API - No key required

const DEFILLAMA_BASE_URL = 'https://api.llama.fi';

export interface Protocol {
    id: string;
    name: string;
    address: string;
    symbol: string;
    url: string;
    description: string;
    chain: string;
    logo: string;
    audits: string;
    audit_note: string | null;
    gecko_id: string | null;
    cmcId: string | null;
    category: string;
    chains: string[];
    module: string;
    twitter: string | null;
    forkedFrom: string[];
    oracles: string[];
    listedAt: number;
    slug: string;
    tvl: number;
    chainTvls: Record<string, number>;
    change_1h: number | null;
    change_1d: number | null;
    change_7d: number | null;
    staking: number | null;
    fdv: number | null;
    mcap: number | null;
}

export async function getAllProtocols(): Promise<Protocol[]> {
    try {
        const response = await fetch(`${DEFILLAMA_BASE_URL}/protocols`, {
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (!response.ok) {
            throw new Error('Failed to fetch protocols');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching protocols:', error);
        return [];
    }
}

export async function getProtocolByName(name: string): Promise<Protocol | null> {
    try {
        const response = await fetch(`${DEFILLAMA_BASE_URL}/protocol/${name}`, {
            next: { revalidate: 300 }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch protocol');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching protocol:', error);
        return null;
    }
}

export function formatTVL(tvl: number): string {
    if (tvl >= 1_000_000_000) {
        return `$${(tvl / 1_000_000_000).toFixed(2)}B`;
    } else if (tvl >= 1_000_000) {
        return `$${(tvl / 1_000_000).toFixed(2)}M`;
    } else if (tvl >= 1_000) {
        return `$${(tvl / 1_000).toFixed(2)}K`;
    }
    return `$${tvl.toFixed(2)}`;
}

export const PROTOCOL_CATEGORIES = [
    'All',
    'Dexes',
    'Lending',
    'Yield',
    'Staking',
    'Liquid Staking',
    'Bridge',
    'Derivatives',
    'Options',
    'CDP',
    'Algo-Stables',
    'Launchpad',
    'Gaming',
    'NFT',
    'Insurance',
];
