import { describe, expect, test, mock } from "bun:test";
import { SenshiValueMint } from "../src/programs/senshiValueMint";
import { Connection, Keypair } from "@solana/web3.js";

describe("SenshiValueMint", () => {
  test("createToken creates a new token", async () => {
    const connection = mock(Connection);
    const payer = Keypair.generate();
    const senshiValueMint = new SenshiValueMint(connection, payer);

    const tokenConfig = {
      name: "Test Token",
      symbol: "TEST",
      decimals: 9
    };

    const tokenMint = await senshiValueMint.createToken(tokenConfig);

    expect(tokenMint).toBeDefined();
    expect(tokenMint.toBase58()).toBeTypeOf("string");
  });
});