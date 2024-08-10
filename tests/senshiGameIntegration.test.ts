import { describe, expect, test, mock } from "bun:test";
import { SenshiGameIntegration } from "../src/programs/senshiGameIntegration";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";

describe("SenshiGameIntegration", () => {
  test("registerGame registers a new game", async () => {
    const connection = mock(Connection);
    const payer = Keypair.generate();
    const gameIntegration = new SenshiGameIntegration(connection, payer);

    const gameConfig = {
      name: "Test Game",
      description: "A test game for Senshi SDK",
      genre: "Action"
    };

    const gameId = await gameIntegration.registerGame(gameConfig);

    expect(gameId).toBeTypeOf("string");
  });

  test("createAsset creates a new game asset", async () => {
    const connection = mock(Connection);
    const payer = Keypair.generate();
    const gameIntegration = new SenshiGameIntegration(connection, payer);

    const asset = await gameIntegration.createAsset("game123", "Sword", "value");

    expect(asset).toHaveProperty("id");
    expect(asset).toHaveProperty("name", "Sword");
    expect(asset).toHaveProperty("gameId", "game123");
    expect(asset).toHaveProperty("tokenType", "value");
    expect(asset.tokenMint).toBeInstanceOf(PublicKey);
  });

  test("linkAssetToToken links an asset to a token", async () => {
    const connection = mock(Connection);
    const payer = Keypair.generate();
    const gameIntegration = new SenshiGameIntegration(connection, payer);
    const mint = Keypair.generate().publicKey;

    const result = await gameIntegration.linkAssetToToken("asset123", mint);

    expect(result).toBe(true);
  });
});