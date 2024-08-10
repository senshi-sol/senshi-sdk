import { Connection, PublicKey, Transaction, sendAndConfirmTransaction, Signer, Commitment } from '@solana/web3.js';

export async function sendAndConfirmTransactionWithRetry(
  connection: Connection,
  transaction: Transaction,
  signers: Array<Signer>,
  commitment: Commitment = 'confirmed'
): Promise<string> {
  let txid: string | undefined;
  for (let i = 0; i < 3; i++) {
    try {
      txid = await sendAndConfirmTransaction(connection, transaction, signers, {
        commitment,
      });
      return txid;
    } catch (e) {
      console.error(`Failed to send transaction: ${e}`);
      if (i === 2) throw e;
    }
  }
  throw new Error('Failed to send transaction');
}