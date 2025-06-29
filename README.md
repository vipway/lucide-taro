# @timkit/lucide-taro

Taro 版 Lucide 图标组件库，无需配置，自动按需加载。

## 安装

```bash
npm install lucide-taro
```

## 使用

```bash
import { Home, Search } from 'lucide-taro';
import { View } from '@tarojs/components';

export default function App() {
  return (
    <View>
      <Home size={32} color="#f00" strokeWidth={1} />
    </View>
  );
}
```
