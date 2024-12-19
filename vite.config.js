import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Check if the chunk is from node_modules (this could be libraries like lodash, react, etc.)
          if (id.includes("node_modules")) {
            // You can group libraries into a 'vendor' chunk
            return "vendor";
          }

          // You can also split large components or libraries into separate chunks manually
          if (id.includes("src/components")) {
            return "components";
          }

          // Optionally, you can create other chunks for specific libraries
          if (id.includes("src/utils")) {
            return "utils";
          }

          // Return undefined to let Vite decide on the default chunking
        },
      },
    },
  },
});
