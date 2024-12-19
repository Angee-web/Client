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
          // Group third-party libraries into a 'vendor' chunk
          if (id.includes("node_modules")) {
            return "vendor";
          }

          // Split large components into their own chunk
          if (id.includes("src/components")) {
            return "components";
          }

          // Split utility functions into a separate chunk
          if (id.includes("src/utils")) {
            return "utils";
          }

          // Example of grouping specific libraries into their own chunks
          if (id.includes("node_modules/react-router-dom")) {
            return "react-router-dom";
          }

          if (id.includes("node_modules/lodash")) {
            return "lodash";
          }
        },
      },
    },
  },
});
