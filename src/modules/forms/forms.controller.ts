import { Request, Response } from "express";
import { FormsService } from "./forms.service";
import { BadRequestError } from "../../core/errors/appErrors";
import {
  sendSuccess,
  sendSuccessMessage,
} from "../../core/utils/responseHandler";

class FormsController {
  async create(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestError("Usuário não autenticado");
    }
    const data = req.body;
    await FormsService.create(data, userId);
    return sendSuccessMessage(res, "Formulário criado com sucesso");
  }
  async getAll(req: Request, res: Response) {
    const forms = await FormsService.getAll();
    return sendSuccess(res, forms, 200);
  }
  async registrarForm(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestError("Usuário não autenticado");
    }
    const { formId, respostas, childId, caregiverId } = req.body;
    await FormsService.registrarForm(
      formId,
      respostas,
      Number(userId),
      Number(childId),
      caregiverId
    );
    return sendSuccessMessage(res, "Formulário registrado com sucesso");
  }
  async getFormsChild(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestError("Usuário não autenticado");
    }
    const childId = parseInt(req.params.id);
    const forms = await FormsService.getFormsChild(Number(childId));
    return sendSuccess(res, forms, 200);
  }
}

export default new FormsController();
