import { defineConfig, squooshImageService } from 'astro/config'
import viteSassGlob from 'vite-plugin-sass-glob-import'
import icon from 'astro-icon'

const SITE = 'https://lorganium.ru'
const ASSETS_PREFIX = process.env.NODE_ENV === 'production' ? SITE : '.'

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  site: SITE,
  compressHTML: false,
  output: 'static',
  build: {
    format: 'file',
    assets: 'assets', // собирает скрипты и стили в папку dist/assets
    assetsPrefix: ASSETS_PREFIX, // добавляет `.` в пути скриптов и стилей
  },
  image: {
    service: squooshImageService(),
  },
  integrations: [
    icon({
      svgoOptions: {
        plugins: [
          'preset-default'
        ],
      },
    })
  ],
  vite: {
    build: {
      assetsInlineLimit: 0, // запрещает инлайн скриптов. по дефолту инлайнит скрипты в html
      cssCodeSplit: false, // css в один файл
      rollupOptions: {
        output: {
          entryFileNames: 'scripts.js',
          assetFileNames: (assetInfo) => {
            return assetInfo.name === 'style.css'
              ? `${assetInfo.name}` // задается имя и папка (корень) для css
              : `assets/${assetInfo.name}` // задается имя и папка картинкам
          },
        },
      },
    },
    plugins: [
      viteSassGlob()
    ],
  },
})
