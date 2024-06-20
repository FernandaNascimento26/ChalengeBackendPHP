import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'public/build',
        rollupOptions: {
            input: {
                app: resolve(__dirname, 'resources/js/app.jsx'),
            },
        },
    },
    server: {
        port: 5173,
    },
});
