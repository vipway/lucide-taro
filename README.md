# lucide-taro

> Lucide 图标库的 Taro 适配版，支持 H5/RN 按需加载 & 微信小程序零配置 HMR

---

## 目录

- [安装](#安装)
- [常规用法 (H5 / RN / SSR)](#常规用法-h5--rn--ssr)
- [微信小程序端用法 (零配置 HMR)](#微信小程序端用法-零配置-hmr)
- [单文件 weapp 入口（备选）](#单文件-weapp-入口备选)
- [脚本 & 构建](#脚本--构建)
- [常见问题](#常见问题)
- [版本 & 更新](#版本--更新)

---

## 安装

````bash
npm install lucide-taro
# or
pnpm add lucide-taro

## 常规用法 (H5 / RN / SSR)

```tsx
import React from 'react'
import { Home, Search } from 'lucide-taro'
import { View } from '@tarojs/components'

export default function App() {
  return (
    <View>
      <Home size={32} color="#f00" />
      <Search strokeWidth={1} />
    </View>
  )
}
````

> 按需加载：生产环境打包只包含已引用的图标
> Tree-shaking：未使用的图标自动剔除

## 微信小程序端用法 (零配置 HMR)

1. 在 Taro 配置中，添加一行 Vite 插件：

```tsx
// taro.config.ts / config/index.ts
import { defineConfig } from "@tarojs/cli";
import lucideTaroHmr from "lucide-taro/vite";

export default defineConfig({
  compiler: {
    type: "vite",
    vitePlugins: [
      lucideTaroHmr(), // ← 唯一新增
      // 其他已有插件…
    ],
  },
});
```

2. 页面中按需引用（与 H5 一致）：

```tsx
import React from "react";
import { Home, Search } from "lucide-taro";
import { View } from "@tarojs/components";

export default function Index() {
  return (
    <View>
      <Home size={48} color="#0a0" />
      <Search size={24} />
    </View>
  );
}
```

> 无需 修改 project.config.json 或 webpackChain
> 文件保存 即可 HMR，不再报 vendors.js 或 React #130

## 单文件 weapp 入口（全量加载）

```tsx
import { Home, Search } from "lucide-taro/weapp";
```

> 一次加载所有图标（Gzip ~50 KB）
> 零配置
> 无按需：打包体积固定，对大多数项目影响可接受
