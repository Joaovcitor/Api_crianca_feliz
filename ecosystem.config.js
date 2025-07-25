// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "minha-api",
      script: "./src/server.ts",

      exec_mode: "fork",
      interpreter: "node",
      args: "-r ts-node/register --inspect ./src/server.ts",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};
