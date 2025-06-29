import fs from 'fs';
import typescript from 'rollup-plugin-typescript2';

// 读取 package.json，避免使用 import assert（某些 Node 版本不支持）
const pkg = JSON.parse(
  fs.readFileSync(new URL('./package.json', import.meta.url), 'utf-8')
);

export default [
  // ES Module 构建
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    },
    external: [
      "tslib",
      ...Object.keys(pkg.peerDependencies || {}),
      'react',
      '@tarojs/components'
    ],
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        useTsconfigDeclarationDir: true
      })
    ]
  },
  // CommonJS 构建
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    external: [
      ...Object.keys(pkg.peerDependencies || {}),
      'react',
      '@tarojs/components'
    ],
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        useTsconfigDeclarationDir: true
      })
    ]
  }
];