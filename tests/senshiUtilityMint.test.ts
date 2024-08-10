import { describe, expect, test, mock } from "bun:test";
import { SenshiUtilityMint } from "../src/programs/senshiUtilityMint";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";

describe("SenshiUtilityMint", () => {
  test("createToken creates a new utility token", async () => {
    const connection = mock(Connection);
    const payer = Keypair.generate();
    const senshiUtilityMint = new SenshiUtilityMint(connection, payer);

    const tokenConfig = {
      name: "Test Utility Token",
      symbol: "TUT",
      decimals: 6
    };

    const tokenMint = await senshiUtilityMint.createToken(tokenConfig);

    expect(tokenMint).toBeDefined();
    expect(tokenMint).toBeInstanceOf(PublicKey);
  });

  test("mintTo mints tokens to a destination", async () => {
    const connection = mock(Connection);
    const payer = Keypair.generate();
    const senshiUtilityMint = new SenshiUtilityMint(connection, payer);
    const mint = Keypair.generate().publicKey;
    const destination = Keypair.generate().publicKey;

    const txid = await senshiUtilityMint.mintTo(mint, destination, 1000);

    expect(txid).toBeTypeOf("string");
  });
});
