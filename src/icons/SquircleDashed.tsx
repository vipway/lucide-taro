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

export default function SquircleDashed({
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
  <path d="M13.77 3.043a34 34 0 0 0-3.54 0" /><path d="M13.771 20.956a33 33 0 0 1-3.541.001" /><path d="M20.18 17.74c-.51 1.15-1.29 1.93-2.439 2.44" /><path d="M20.18 6.259c-.51-1.148-1.291-1.929-2.44-2.438" /><path d="M20.957 10.23a33 33 0 0 1 0 3.54" /><path d="M3.043 10.23a34 34 0 0 0 .001 3.541" /><path d="M6.26 20.179c-1.15-.508-1.93-1.29-2.44-2.438" /><path d="M6.26 3.82c-1.149.51-1.93 1.291-2.44 2.44" />
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