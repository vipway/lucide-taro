// scripts/generate-lucide-icons.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 当前模块目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 源图标和目标目录
const LUCIDE_ICONS_DIR = path.resolve(__dirname, "../node_modules/lucide-react/dist/esm/icons");
const TARGET_ICONS_DIR = path.resolve(__dirname, "../src/icons");

// 清空并重建目标目录
if (fs.existsSync(TARGET_ICONS_DIR)) {
  fs.rmSync(TARGET_ICONS_DIR, { recursive: true, force: true });
}
fs.mkdirSync(TARGET_ICONS_DIR, { recursive: true });

// 辅助：kebab-case 转 PascalCase
function kebabToPascalCase(name) {
  return name
    .split("-")
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join("");
}

// 辅助：构建 <path …/> 等子节点字符串
function buildElementsString(iconNode) {
  const raw = iconNode
    .map(([tag, attrs]) => {
      const attrString = Object.entries(attrs)
        .filter(([k]) => k !== "key")
        .map(([k, v]) => `${k}="${v}"`)
        .join(" ");
      return `<${tag} ${attrString} />`;
    })
    .join("");
  return raw.replace(/\s+/g, " ");
}

async function generateIconComponent(iconFileName) {
  const nameBase = path.basename(iconFileName, ".js");
  const pascal = kebabToPascalCase(nameBase);
  const jsPath = path.join(LUCIDE_ICONS_DIR, iconFileName);
  const targetPath = path.join(TARGET_ICONS_DIR, `${pascal}.tsx`);

  try {
    const mod = await import(`file://${jsPath}`);
    const iconNode = mod.__iconNode;
    if (!iconNode) return;

    const elementsString = buildElementsString(iconNode);
    const componentCode = `
import React from "react";
import { View as TView, Image as TImage } from "@tarojs/components";

export interface IconProps {
  /** 大小：数字为 px，也可传带单位的字符串 */
  size?: number | string;
  /** 线宽 */
  strokeWidth?: number;
  /** 描边颜色 */
  color?: string;
  className?: string;
  [key: string]: any;
}

export default function ${pascal}({
  size = 24,
  strokeWidth = 2,
  color = "#393939",
  className,
  ...props
}: IconProps) {
  const style = {
    width: typeof size === "number" ? \`\${size}px\` : size,
    height: typeof size === "number" ? \`\${size}px\` : size,
  };

  const svg = \`
<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${color}" stroke-width="\${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
  ${elementsString}
</svg>
  \`.trim();

  const dataUrl = "data:image/svg+xml;utf8," + encodeURIComponent(svg);

  return (
    <TView className={className} style={style}>
      <TImage
        src={dataUrl}
        mode="aspectFit"
        style={{ width: "100%", height: "100%" }}
        {...props}
      />
    </TView>
  );
}
`.trim();

    fs.writeFileSync(targetPath, componentCode, "utf8");
    console.log(`✔ 生成 ${pascal}.tsx`);
  } catch (err) {
    console.error(`✖ 生成 ${pascal}.tsx 失败：`, err);
  }
}

async function main() {
  console.log("开始批量生成 Lucide 图标组件…");

  // 1. 批量生成组件
  const files = fs.readdirSync(LUCIDE_ICONS_DIR).filter(f => f.endsWith(".js"));
  for (const f of files) {
    await generateIconComponent(f);
  }

  // 2. 生成 src/icons/index.ts，只导出组件
  const names = fs
    .readdirSync(TARGET_ICONS_DIR)
    .filter(f => f.endsWith(".tsx"))
    .map(f => path.basename(f, ".tsx"));

  const lines = [
    "/** 自动生成：请勿手写 */",
    "",
    ...names.map(name => `export { default as ${name} } from "./${name}";`),
  ];

  fs.writeFileSync(path.join(TARGET_ICONS_DIR, "index.ts"), lines.join("\n"), "utf8");
  console.log("✔ src/icons/index.ts 生成完毕");
}

main();
