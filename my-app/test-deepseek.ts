import { generateSummaryFromDeekseek } from "@/lib/deepseek";
import fs from "fs";
import path from "path";

async function testDeepSeek() {
  const sampleText = fs.readFileSync(path.resolve(__dirname, "sample.txt"), "utf-8");

  try {
    const summary = await generateSummaryFromDeekseek(sampleText);
    console.log("✅ DeepSeek Summary:\n", summary);
  } catch (error) {
    console.error("❌ DeepSeek failed:", error);
  }
}

testDeepSeek();
