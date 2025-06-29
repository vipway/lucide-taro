import fs from 'fs';
import typescript from 'rollup-plugin-typescript2';

// 读取 package.json，避免使用 import assert
const pkg = JSON.parse(
  fs.readFileSync(new URL('./package.json', import.meta.url), 'utf-8')
);

// 通用 external
const externals = [
  'tslib',
  ...Object.keys(pkg.peerDependencies || {}),
  'react',
  '@tarojs/components'
];

export default [
  // 1) ES Module 构建（按需加载 H5/RN/SSR）
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,    // dist/index.esm.js
      format: 'es',
      sourcemap: true
    },
    external: externals,
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        useTsconfigDeclarationDir: true
      })
    ]
  },

  // 2) CommonJS 构建（Node/CJS 兼容）
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,      // dist/index.cjs.js
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    external: externals,
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        useTsconfigDeclarationDir: true
      })
    ]
  },

  // 3) 单文件 weapp 入口（小程序端零配置）
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/weapp.js',
      format: 'es',
      inlineDynamicImports: true, // 把所有图标打进一个文件
      sourcemap: false
    },
    treeshake: false,             // 保留全部导出
    external: externals,
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        useTsconfigDeclarationDir: true
      })
    ]
  },

  // 4) HMR 插件脚本编译（供 `import 'lucide-taro/vite'` 使用）
  {
    input: 'src/lucide-taro-hmr.ts',
    output: [
      {
        file: 'dist/lucide-taro-hmr.js',       // ESM 版
        format: 'es',
        sourcemap: false
      },
      {
        file: 'dist/lucide-taro-hmr.cjs',   // CJS 版
        format: 'cjs',
        exports: 'default',
        sourcemap: false
      }
    ],
    external: externals,
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        useTsconfigDeclarationDir: true
      })
    ]
  }
];
