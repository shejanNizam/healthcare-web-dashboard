import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
});

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: "192.168.10.80",
//     port: 8000,
//   },
// });
