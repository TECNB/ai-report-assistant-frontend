import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
//注意引入
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'



// https://vitejs.dev/config/
export default defineConfig({
  base:  "./",
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],

  build: {
    emptyOutDir: false,     // 避免清空 dist 目录
    rollupOptions: {
      external: ['electron'], // 排除 Electron 主进程依赖
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: true, // 开启热更新
    proxy: {
      '/api': {
        target: 'http://10.248.68.50:8080',	//实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        // 显示请求代理后的真实地址
      },
    }
  },


  //下面是新加入的内容
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  }
})