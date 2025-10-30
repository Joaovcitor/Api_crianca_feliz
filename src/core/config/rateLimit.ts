import rateLimit from "express-rate-limit";
export function rateLimitConfig(winMs: number, mx: number, message: string) {
  return rateLimit({
    windowMs: winMs,
    max: mx,
    standardHeaders: true,
    legacyHeaders: false,
    message,
  });
}
