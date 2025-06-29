// src/lucide-taro-hmr.ts
type UserConfig = Record<string, any>
type ConfigEnv = { command: 'serve' | 'build'; mode: string }
type HmrContext = {
  file: string
  server: { moduleGraph: { invalidateAll(): void } }
}

interface Plugin {
  name: string
  apply?: 'serve' | 'build'
  config?(cfg: UserConfig, env: ConfigEnv): void
  handleHotUpdate?(ctx: HmrContext): void
}

export default function lucideTaroHmr(): Plugin {
  const PKG = 'lucide-taro'
  const GLOB = `!**/node_modules/${PKG}/**`
  const RE = new RegExp(PKG)

  return {
    name: 'lucide-taro-hmr',
    apply: 'serve',
    config(cfg, env) {
      if (env.command !== 'serve') return
      cfg.optimizeDeps = {
        ...(cfg.optimizeDeps || {}),
        exclude: [...(cfg.optimizeDeps.exclude || []), PKG]
      }
      cfg.server = {
        ...(cfg.server || {}),
        watch: {
          ...(cfg.server?.watch || {}),
          ignored: [...(cfg.server?.watch?.ignored || []), GLOB]
        }
      }
    },
    handleHotUpdate(ctx) {
      if (RE.test(ctx.file)) ctx.server.moduleGraph.invalidateAll()
    }
  }
}
