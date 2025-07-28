import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import type { UserResponseDto } from "../dtos/UserResponseDTO";
import type { UserCreateVisitador } from "../dtos/UserCreateVisitadorDTO";
import type { UserCreateCoordenador } from "../dtos/UserCreateCoordenadorDTO";

export const UserController = {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserService.getAll();
      return res.status(200).json(users);
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: error.message || "Internal Server Error" });
    }
  },
  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await UserService.getById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    } catch (e: any) {
      return res.status(500).json({
        error: e.message || "Internal Server Error",
      });
    }
  },

  async createVisitador(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      cpf,
      territorio,
      cras,
    }: UserCreateVisitador = req.body;
    try {
      const supervisorId = req.user?.id;
      if (!supervisorId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const newUserFromDB = await UserService.createVisitador(
        { name, email, password, cpf, territorio, cras },
        supervisorId
      );
      const newUserResponse: UserResponseDto = {
        id: newUserFromDB.id,
        name: newUserFromDB.name,
        email: newUserFromDB.email,
        createdAt: newUserFromDB.createdAt.toISOString(),
      };
      return res.status(201).json(newUserResponse);
    } catch (e: any) {
      return res.status(500).json({
        error: e.message || "Internal Server Error",
      });
    }
  },
  async createSupervisor(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      cpf,
      cras,
      territorio,
    }: UserCreateCoordenador = req.body;
    try {
      const coordenadorId = req.user?.id;
      if (!coordenadorId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      if (!territorio) {
        return res.status(400).json({ errors: "Território é obrigatório!" });
      }

      const newUserFromDB = await UserService.createSupervisor(
        { name, email, password, cpf, cras, territorio },
        coordenadorId
      );
      const newUserResponse: UserResponseDto = {
        id: newUserFromDB.id,
        name: newUserFromDB.name,
        email: newUserFromDB.email,
        createdAt: newUserFromDB.createdAt.toISOString(),
      };
      return res.status(201).json(newUserResponse);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: e.message || "Internal Server Error",
      });
    }
  },
  async createCoordenador(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      cpf,
      cras,
      territorio,
    }: UserCreateCoordenador = req.body;
    try {
      if (!territorio) {
        return res.status(400).json({ errors: "Território é obrigatório!" });
      }

      const newUserFromDB = await UserService.createCoordenador({
        name,
        email,
        password,
        cpf,
        cras,
        territorio,
      });
      const newUserResponse: UserResponseDto = {
        id: newUserFromDB.id,
        name: newUserFromDB.name,
        email: newUserFromDB.email,
        createdAt: newUserFromDB.createdAt.toISOString(),
      };
      return res.status(201).json(newUserResponse);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: e.message || "Internal Server Error",
      });
    }
  },

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const updatedUser = await UserService.update(id, req.body);
      return res.status(200).json(updatedUser);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);
      await UserService.delete(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};
