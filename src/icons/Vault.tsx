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

export default function Vault({
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
  <rect width="18" height="18" x="3" y="3" rx="2" /><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" /><path d="m7.9 7.9 2.7 2.7" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /><path d="m13.4 10.6 2.7-2.7" /><circle cx="7.5" cy="16.5" r=".5" fill="currentColor" /><path d="m7.9 16.1 2.7-2.7" /><circle cx="16.5" cy="16.5" r=".5" fill="currentColor" /><path d="m13.4 13.4 2.7 2.7" /><circle cx="12" cy="12" r="2" />
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