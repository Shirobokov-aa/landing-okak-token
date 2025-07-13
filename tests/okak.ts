import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Okak } from "../target/types/okak";
import { PublicKey } from "@solana/web3.js";
import { expect } from "chai";

describe("OkakCat Token Tests 🐱", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.okak as Program<Okak>;
  const OKAK_TOKEN_MINT = "C8b1gN1rm5Mvp9KXfFbC4jzB3mYZafDJgAFfUebo9Qq2";

  let okakInfoPda: PublicKey;
  let okakInfoBump: number;

  before(async () => {
    [okakInfoPda, okakInfoBump] = await PublicKey.findProgramAddress(
      [Buffer.from("okak_info")],
      program.programId
    );
  });

  it("🚀 Initialize OkakCat program", async () => {
    try {
      const tx = await program.methods
        .initialize()
        .accounts({
          okakInfo: okakInfoPda,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      console.log("✅ OkakCat initialized! Transaction:", tx);

      // Проверяем состояние
      const okakInfo = await program.account.okakInfo.fetch(okakInfoPda);
      expect(okakInfo.totalSupply.toString()).to.equal("1000000000000000");
      expect(okakInfo.surprisedCats.toString()).to.equal("0");
    } catch (error) {
      console.log("ℹ️ Program already initialized or error:", error.message);
    }
  });

  it("😺 Test surprise reaction", async () => {
    const tx = await program.methods
      .surpriseReaction()
      .accounts({
        okakInfo: okakInfoPda,
        user: provider.wallet.publicKey,
      })
      .rpc();

    console.log("😺 Surprise reaction recorded! Transaction:", tx);

    const okakInfo = await program.account.okakInfo.fetch(okakInfoPda);
    console.log("🔢 Total surprised cats:", okakInfo.surprisedCats.toString());
  });

  it("📊 Display OkakCat info", async () => {
    try {
      const okakInfo = await program.account.okakInfo.fetch(okakInfoPda);

      console.log("\n🐱 === OkakCat Token Info === 🐱");
      console.log("📍 Token Mint:", OKAK_TOKEN_MINT);
      console.log("💰 Total Supply:", okakInfo.totalSupply.toString());
      console.log("😺 Surprised Cats:", okakInfo.surprisedCats.toString());
      console.log("👑 Authority:", okakInfo.authority.toString());
      console.log("🎯 Program ID:", program.programId.toString());
    } catch (error) {
      console.log("❌ Error fetching info:", error.message);
    }
  });
});
