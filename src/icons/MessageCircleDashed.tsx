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

export default function MessageCircleDashed({
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
  <path d="M13.5 3.1c-.5 0-1-.1-1.5-.1s-1 .1-1.5.1" /><path d="M19.3 6.8a10.45 10.45 0 0 0-2.1-2.1" /><path d="M20.9 13.5c.1-.5.1-1 .1-1.5s-.1-1-.1-1.5" /><path d="M17.2 19.3a10.45 10.45 0 0 0 2.1-2.1" /><path d="M10.5 20.9c.5.1 1 .1 1.5.1s1-.1 1.5-.1" /><path d="M3.5 17.5 2 22l4.5-1.5" /><path d="M3.1 10.5c0 .5-.1 1-.1 1.5s.1 1 .1 1.5" /><path d="M6.8 4.7a10.45 10.45 0 0 0-2.1 2.1" />
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