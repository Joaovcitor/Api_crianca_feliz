import { Response, Request, NextFunction } from "express";

export function verifyRole(role: string, role2?: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !userRole.includes(role)) {
      return res
        .status(403)
        .json({ message: "Você não tem autorização para usar esse recurso!" });
    }
    next();
  };
}
