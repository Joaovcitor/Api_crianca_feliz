// src/declarations.d.ts

// Declaração para permitir imports de arquivos .js
declare module "*.js";

// Define o tipo de dados do seu objeto 'user' que vem do token/auth
// Sinta-se à vontade para adicionar mais campos se precisar deles.
interface UserPayload {
  id: number;
  name: string;
  // exemplo: email: string;
}

// Estende a interface Request do Express globalmente
declare namespace Express {
  export interface Request {
    user?: UserPayload;
  }
}
