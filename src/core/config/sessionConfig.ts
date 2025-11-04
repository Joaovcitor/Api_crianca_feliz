import session from "express-session";
import sessionFileStore from "session-file-store";
import path from "path";
import os from "os";
import { cookieSettings } from "./cookiesConfig"; // Importa sua config de cookie

const FileStore = sessionFileStore(session);

// Validação de segurança para o segredo da sessão
const sessionSecret = process.env.SECRET_SESSION_COOKIE;
if (!sessionSecret) {
  console.error("Erro fatal: SECRET_SESSION_COOKIE não está definido no .env");
  process.exit(1); // Trava a aplicação se o segredo não existir
}

export const sessionConfig = session({
  name: "app.sid", // Nome recomendado para dificultar fingerprinting
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: new FileStore({
    logFn: function () {},
    path: path.join(os.tmpdir(), "sessions"),
  }),
  cookie: cookieSettings, // Usa a configuração de cookie importada
});
