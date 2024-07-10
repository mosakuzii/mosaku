import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        hmr: {
            clientPort: 5173,
            host: 'localhost',
        }
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        outDir: 'public/build',
        rollupOptions: {
            input: [
                'resources/js/app.jsx',
                'resources/js/Pages/App.jsx',
            ],
        }
    }
});
