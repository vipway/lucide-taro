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

export default function BugOff({
  size = 24,
  strokeWidth = 2,
  color = "#393939",
  className,
  ...props
}: IconProps) {
  const style = {
    width: typeof size === "number" ? `${size}px` : size,
    height: typeof size === "number" ? `${size}px` : size,
  };

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
  <path d="M15 7.13V6a3 3 0 0 0-5.14-2.1L8 2" /><path d="M14.12 3.88 16 2" /><path d="M22 13h-4v-2a4 4 0 0 0-4-4h-1.3" /><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" /><path d="m2 2 20 20" /><path d="M7.7 7.7A4 4 0 0 0 6 11v3a6 6 0 0 0 11.13 3.13" /><path d="M12 20v-8" /><path d="M6 13H2" /><path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
</svg>
  `.trim();

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