import { Connection, Keypair, PublicKey, TransactionInstruction, Transaction } from '@solana/web3.js';
import { getMint, createMint, mintTo as splMintTo, burn as splBurn, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { TokenConfig } from '../types';
import { SENSHI_VALUE_MINT_PROGRAM_ID } from '../utils/constants';
import { sendAndConfirmTransactionWithRetry } from '../utils/helpers';

export class SenshiValueMint {
  private connection: Connection;
  private payer: Keypair;

  constructor(connection: Connection, payer: Keypair) {
    this.connection = connection;
    this.payer = payer;
  }

  async createToken(config: TokenConfig): Promise<PublicKey> {
    const mint = await createMint(
      this.connection,
      this.payer,
      this.payer.publicKey,
      null,
      config.decimals,
      undefined,
      undefined,
      TOKEN_PROGRAM_ID
    );

    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: mint, isSigner: false, isWritable: true },
        { pubkey: this.payer.publicKey, isSigner: true, isWritable: false },
      ],
      programId: SENSHI_VALUE_MINT_PROGRAM_ID,
      data: Buffer.from(JSON.stringify(config)),
    });

    await sendAndConfirmTransactionWithRetry(
      this.connection,
      new Transaction().add(instruction),
      [this.payer]
    );

    console.log(`Value token created: ${mint.toBase58()}`);
    return mint;
  }

  async mintTo(mint: PublicKey, destination: PublicKey, amount: number): Promise<string> {
    return await splMintTo(
      this.connection,
      this.payer,
      mint,
      destination,
      this.payer.publicKey,
      amount
    );
  }

  async burn(mint: PublicKey, account: PublicKey, amount: number): Promise<string> {
    return await splBurn(
      this.connection,
      this.payer,
      account,
      mint,
      this.payer.publicKey,
      amount
    );
  }
}