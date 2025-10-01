import type { Falta, UserRole } from "@prisma/client";
import { prisma } from "../../core/prisma/prisma";
import type { UserCreateRh } from "./rh.dto";
import { BadRequestError, NotFoundError } from "../../core/errors/appErrors";

export const RhService = {
  async createUser(data: UserCreateRh) {
    const existUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existUser) {
      throw new BadRequestError("Email já cadastrado!");
    }
    const user = await prisma.user.create({
      data: {
        ...data,
        role: "rh" as UserRole,
      },
    });
    return user;
  },
};
