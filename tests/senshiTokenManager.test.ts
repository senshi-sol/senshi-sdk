import { describe, expect, test, mock } from "bun:test";
import { SenshiTokenManager } from "../src/programs/senshiTokenManager";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";

describe("SenshiTokenManager", () => {
  test("swapTokens performs a token swap", async () => {
    const connection = mock(Connection);
    const payer = Keypair.generate();
    const tokenManager = new SenshiTokenManager(connection, payer);
    const fromMint = Keypair.generate().publicKey;
    const toMint = Keypair.generate().publicKey;

    const txid = await tokenManager.swapTokens(fromMint, toMint, 100);

    expect(txid).toBeTypeOf("string");
  });

  test("crossChainDeposit initiates a cross-chain deposit", async () => {
    const connection = mock(Connection);
    const payer = Keypair.generate();
    const tokenManager = new SenshiTokenManager(connection, payer);
    const mint = Keypair.generate().publicKey;

    const txid = await tokenManager.crossChainDeposit(mint, 100, "Ethereum");

    expect(txid).toBeTypeOf("string");
  });

  test("purchaseAsset performs an asset purchase", async () => {
    const connection = mock(Connection);
    const payer = Keypair.generate();
    const tokenManager = new SenshiTokenManager(connection, payer);
    const mint = Keypair.generate().publicKey;

    const txid = await tokenManager.purchaseAsset(mint, "asset123", 500);

    expect(txid).toBeTypeOf("string");
  });
});