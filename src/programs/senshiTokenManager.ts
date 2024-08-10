import { Connection, Keypair, PublicKey, TransactionInstruction, Transaction } from '@solana/web3.js';
import { getMint } from '@solana/spl-token';
import { SENSHI_TOKEN_MANAGER_PROGRAM_ID } from '../utils/constants';
import { sendAndConfirmTransactionWithRetry } from '../utils/helpers';

export class SenshiTokenManager {
  private connection: Connection;
  private payer: Keypair;

  constructor(connection: Connection, payer: Keypair) {
    this.connection = connection;
    this.payer = payer;
  }

  async swapTokens(fromMint: PublicKey, toMint: PublicKey, amount: number): Promise<string> {
    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: fromMint, isSigner: false, isWritable: true },
        { pubkey: toMint, isSigner: false, isWritable: true },
        { pubkey: this.payer.publicKey, isSigner: true, isWritable: false },
      ],
      programId: SENSHI_TOKEN_MANAGER_PROGRAM_ID,
      data: Buffer.from(JSON.stringify({ action: 'swap', amount })),
    });

    return sendAndConfirmTransactionWithRetry(
      this.connection,
      new Transaction().add(instruction),
      [this.payer]
    );
  }

  async crossChainDeposit(mint: PublicKey, amount: number, destinationChain: string): Promise<string> {
    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: mint, isSigner: false, isWritable: true },
        { pubkey: this.payer.publicKey, isSigner: true, isWritable: false },
      ],
      programId: SENSHI_TOKEN_MANAGER_PROGRAM_ID,
      data: Buffer.from(JSON.stringify({ action: 'crossChainDeposit', amount, destinationChain })),
    });

    return sendAndConfirmTransactionWithRetry(
      this.connection,
      new Transaction().add(instruction),
      [this.payer]
    );
  }

  async purchaseAsset(mint: PublicKey, assetId: string, price: number): Promise<string> {
    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: mint, isSigner: false, isWritable: true },
        { pubkey: this.payer.publicKey, isSigner: true, isWritable: false },
      ],
      programId: SENSHI_TOKEN_MANAGER_PROGRAM_ID,
      data: Buffer.from(JSON.stringify({ action: 'purchaseAsset', assetId, price })),
    });

    return sendAndConfirmTransactionWithRetry(
      this.connection,
      new Transaction().add(instruction),
      [this.payer]
    );
  }
}