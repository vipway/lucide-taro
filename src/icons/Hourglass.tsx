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

export default function Hourglass({
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
  <path d="M5 22h14" /><path d="M5 2h14" /><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" /><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
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