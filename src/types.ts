import { PublicKey } from '@solana/web3.js';

export interface TokenConfig {
  name: string;
  symbol: string;
  decimals: number;
}

export interface GameConfig {
  name: string;
  description: string;
  genre: string;
}

export interface Asset {
  id: string;
  name: string;
  gameId: string;
  tokenType: 'value' | 'utility';
  tokenMint: PublicKey;
}