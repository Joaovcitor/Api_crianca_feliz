// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "minha-api",
      script: "./dist/server.js", // <-- O PONTO CHAVE: Apontamos para o arquivo JS compilado!
      instances: 1, // ou 'max' para usar todos os cores
      autorestart: true,
      watch: false, // Nunca use 'watch' em produção com um build
      max_memory_restart: "1G",

      // Define as variáveis de ambiente para produção
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
