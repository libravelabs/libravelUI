import { getComponentDocs } from "../src/lib/registry-docs";
import path from "path";

const filePath = path.resolve("src/components/ui/motion/animated-text.tsx");
const docs = getComponentDocs(filePath);

const componentDocs = docs[0];
if (componentDocs) {
  console.log("Variants Type:", componentDocs.props.variants?.type);
} else {
  console.log("No docs found");
}
