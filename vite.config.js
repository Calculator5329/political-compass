import { defineConfig } from 'vite';

// Dev port comes from the harness (PORT env) so parallel sessions don't collide.
export default defineConfig({
  server: { port: process.env.PORT ? Number(process.env.PORT) : 5620 },
});
