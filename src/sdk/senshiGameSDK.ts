import { Connection, Keypair } from '@solana/web3.js';
import { SenshiValueMint } from '../programs/senshiValueMint';
import { SenshiUtilityMint } from '../programs/senshiUtilityMint';
import { SenshiTokenManager } from '../programs/senshiTokenManager';
import { SenshiGameIntegration } from '../programs/senshiGameIntegration';

export class SenshiGameSDK {
  public valueMint: SenshiValueMint;
  public utilityMint: SenshiUtilityMint;
  public tokenManager: SenshiTokenManager;
  public gameIntegration: SenshiGameIntegration;

  constructor(connection: Connection, payer: Keypair) {
    this.valueMint = new SenshiValueMint(connection, payer);
    this.utilityMint = new SenshiUtilityMint(connection, payer);
    this.tokenManager = new SenshiTokenManager(connection, payer);
    this.gameIntegration = new SenshiGameIntegration(connection, payer);
  }
}