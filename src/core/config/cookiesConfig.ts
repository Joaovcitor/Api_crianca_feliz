import { CookieOptions } from "express-session";

// Define e exporta as configurações de cookie
export const cookieSettings: CookieOptions = {
  maxAge: 28800000, // 8 horas
  httpOnly: true,
};

// Aplica regras de produção dinamicamente
if (process.env.NODE_ENV === "production") {
  cookieSettings.secure = true;
  cookieSettings.sameSite = "none";
} else {
  cookieSettings.secure = false;
  cookieSettings.sameSite = "lax";
}
