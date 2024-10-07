// vite.config.js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // Ensure 'path' is imported

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.js'],
      refresh: true,
    }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js'),
      '@css': path.resolve(__dirname, 'resources/css'), // Define '@css' alias
    },
  },
});
// // vite.config.js
// import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue';
// import path from 'path';

// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'resources/js'),
//       '@css': path.resolve(__dirname, 'resources/css'),
//     },
//   },
// });
