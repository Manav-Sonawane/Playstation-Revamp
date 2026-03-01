import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { WebSocketServer } from 'ws';

function playstationWsPlugin() {
  return {
    name: 'playstation-ws',
    configureServer(server) {
      const wss = new WebSocketServer({ noServer: true });

      server.httpServer?.on('upgrade', (request, socket, head) => {
        if (request.url === '/playstation-ws') {
          wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
          });
        }
      });

      wss.on('connection', (ws) => {
        ws.on('message', (message) => {
          // Broadcast message to everyone except sender
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === 1) { // 1 = OPEN
              client.send(message.toString());
            }
          });
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), playstationWsPlugin()],
  server: {
    host: true,
    allowedHosts: true,
  },
});
