# vite-plugin-only-legacy

删除支持原生 ESM script 标签、支持原生 ESM 动态导入 和 import.meta现代浏览器脚本引入，只保留支持传统浏览器的脚本引入。

## 下载

```bash
pnpm add -D vite-plugin-only-legacy
```

## 用法

```ts
import onlyLegacy from 'vite-plugin-only-legacy'

export default {
  plugins: [
    onlyLegacy(),
  ],
}
```