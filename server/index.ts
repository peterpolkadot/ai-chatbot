import { createServer } from "http";
import { createApp } from "./createApp";
import { setupVite, serveStatic, log } from "./vite";

(async () => {
  const app = createApp();
  const server = createServer(app);

  // Only setup vite in development and after setting up all routes
  // so the catch-all route doesn't interfere with the other routes
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
