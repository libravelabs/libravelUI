import fs from "fs";
import path from "path";

const registryPath = path.join(process.cwd(), "public/registry.json");
console.log("Reading registry from:", registryPath);

try {
  const content = fs.readFileSync(registryPath, "utf8");
  const registry = JSON.parse(content);

  console.log("Total keys:", Object.keys(registry).length);

  if (registry["styles"]) {
    console.log("✅ 'styles' found.");
    console.log(
      "   Files:",
      registry["styles"].files.map((f) => f.name),
    );
  } else {
    console.error("❌ 'styles' NOT found.");
  }

  if (registry["utils"]) {
    console.log("✅ 'utils' found.");
    console.log(
      "   Files:",
      registry["utils"].files.map((f) => f.name),
    );
  } else {
    console.error("❌ 'utils' NOT found.");
  }

  if (registry["default"]) {
    console.log("⚠️ 'default' found (deprecated/unexpected).");
  }
} catch (e) {
  console.error("Failed to read/parse registry:", e);
}
