// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "minha-api",
      script: "./src/server.ts",

      exec_mode: "fork",
      interpreter: "node",
      interpreter_args: "-r ts-node/register",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};
