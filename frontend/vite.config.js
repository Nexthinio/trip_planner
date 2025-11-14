import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    allowedHosts: ["tripplanner-production-c097.up.railway.app"],
    host: "0.0.0.0",
    port: 4173,
  },
});
