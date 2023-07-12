import { defineConfig, loadEnv } from 'vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { QtResolver, VxeTableResolver } from '@quantum-asia/vite-plugin-vue-components';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import LogInfo from '@quantum-asia/vite-plugin-log-info';
import Unocss from 'unocss/vite';

export default ({ mode }) => {
  const __DEV__ = mode === 'development';

  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: __DEV__ ? '/' : './',
    plugins: [
      Vue(),
      VueJsx(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [NaiveUiResolver(), QtResolver(), VxeTableResolver()],
        dts: './types/auto-imports.d.ts',
      }),
      Components({
        resolvers: [NaiveUiResolver(), QtResolver(), VxeTableResolver()],
        dts: './types/components.d.ts',
      }),
      Unocss(),
      LogInfo(),
    ],
    resolve: {
      alias: {
        '@': `${resolve(__dirname, 'src')}`,
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    },
    css: {
      postcss: {
        plugins: [
          require('autoprefixer'),
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: atRule => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import '@/styles/base/variables.scss';`,
        },
      },
    },
    server: {
      host: true,
      port: 10000,
      proxy: {
        '/v2': {
          target: 'https://testxa.360scm.com',
          changeOrigin: true,
        },
      },
    },
    build: {
      target: 'es2020',
      cssTarget: 'chrome80',
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
    },
  });
};
