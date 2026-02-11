import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
            // nestjs后端地址
            target: 'https://app.caoki.cn',
            ws: true,
          },
        },
      },
    },
  };
});
