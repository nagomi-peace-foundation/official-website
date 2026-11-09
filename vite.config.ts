import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, type Plugin} from 'vite';

function excludeTestPagesPlugin(): Plugin {
  return {
    name: 'exclude-test-pages-from-dist',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const testFiles = ['test_cors.html', 'test_phase2.html'];
      for (const file of testFiles) {
        const filePath = path.join(distDir, file);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`[Production Build] Excluded ${file} from release distribution.`);
        }
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: process.env.VITE_BASE_PATH || './',
    plugins: [react(), tailwindcss(), excludeTestPagesPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
