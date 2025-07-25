// ecosystem.config.js

module.exports = {
  apps: [
    {
      name: "minha-api",
      script: "./src/server.ts",
      interpreter: "./node_modules/.bin/ts-node",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};
