import { Connection, Keypair, PublicKey, TransactionInstruction, Transaction } from '@solana/web3.js';
import { getMint } from '@solana/spl-token';
import { GameConfig, Asset } from '../types';
import { SENSHI_GAME_INTEGRATION_PROGRAM_ID } from '../utils/constants';
import { sendAndConfirmTransactionWithRetry } from '../utils/helpers';

export class SenshiGameIntegration {
  private connection: Connection;
  private payer: Keypair;

  constructor(connection: Connection, payer: Keypair) {
    this.connection = connection;
    this.payer = payer;
  }

  async registerGame(config: GameConfig): Promise<string> {
    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: this.payer.publicKey, isSigner: true, isWritable: false },
      ],
      programId: SENSHI_GAME_INTEGRATION_PROGRAM_ID,
      data: Buffer.from(JSON.stringify({ action: 'registerGame', config })),
    });

    return sendAndConfirmTransactionWithRetry(
      this.connection,
      new Transaction().add(instruction),
      [this.payer]
    );
  }

  async createAsset(gameId: string, assetName: string, tokenType: 'value' | 'utility'): Promise<Asset> {
    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: this.payer.publicKey, isSigner: true, isWritable: false },
      ],
      programId: SENSHI_GAME_INTEGRATION_PROGRAM_ID,
      data: Buffer.from(JSON.stringify({ action: 'createAsset', gameId, assetName, tokenType })),
    });

    const txid = await sendAndConfirmTransactionWithRetry(
      this.connection,
      new Transaction().add(instruction),
      [this.payer]
    );

    // In a real implementation, you would fetch the created asset data from the blockchain
    // Here, we're mocking it for simplicity
    const asset: Asset = {
      id: txid, // Using transaction ID as asset ID for this example
      name: assetName,
      gameId,
      tokenType,
      tokenMint: new PublicKey(txid), // Mocking a token mint address
    };

    return asset;
  }

  async linkAssetToToken(assetId: string, mint: PublicKey): Promise<boolean> {
    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: this.payer.publicKey, isSigner: true, isWritable: false },
        { pubkey: mint, isSigner: false, isWritable: true },
      ],
      programId: SENSHI_GAME_INTEGRATION_PROGRAM_ID,
      data: Buffer.from(JSON.stringify({ action: 'linkAssetToToken', assetId })),
    });

    await sendAndConfirmTransactionWithRetry(
      this.connection,
      new Transaction().add(instruction),
      [this.payer]
    );

    return true;
  }
}