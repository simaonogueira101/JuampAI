import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      esbuild: {
        jsxImportSource: 'hono/jsx/dom'
      },
      build: {
        rollupOptions: {
          input: './src/client.tsx',
          output: {
            entryFileNames: 'static/client.js'
          }
        }
      }
    }
  } else {
    return {
      plugins: [
        devServer({
          entry: 'src/index.tsx'
        })
      ],
      server: {
        port: 5173,
        host: true,
        watch: {
          usePolling: true,
          interval: 500
        }
      }
    }
  }
})