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

export default function NotepadTextDashed({
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
  <path d="M8 2v4" /><path d="M12 2v4" /><path d="M16 2v4" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M20 12v2" /><path d="M20 18v2a2 2 0 0 1-2 2h-1" /><path d="M13 22h-2" /><path d="M7 22H6a2 2 0 0 1-2-2v-2" /><path d="M4 14v-2" /><path d="M4 8V6a2 2 0 0 1 2-2h2" /><path d="M8 10h6" /><path d="M8 14h8" /><path d="M8 18h5" />
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