import SendMessageService from "@modules/messaging/services/SendMessageService";
import AddPicturesToStageService from "@modules/stages/services/AddPicturesToStageService";
import UpdateStageStatusService from "@modules/stages/services/UpdateStageStatusService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class StageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { stageID } = request.params;

    const updateStageStatusService = container.resolve(UpdateStageStatusService);

    const stage = await updateStageStatusService.execute(stageID);

    return response.json(classToClass(stage));
  }

  public async addPicture(request: Request, response: Response): Promise<Response> {
    const { stageID } = request.params;
    const files = request.files as Express.Multer.File[];
    const fileNames = files.map((file) => file.filename);

    const addPictureService = container.resolve(AddPicturesToStageService);

    const stage = await addPictureService.execute({ stageID, fileNames });

    const sendMessageService = container.resolve(SendMessageService);

    const body = `Olá ${stage.order.clientName}, seu pedido de id ${stage.orderID} teve o status da etapa ${stage.name} atualizado para ${stage.status} acesse o link testeUrl para visualizar seu pedido`;

    await sendMessageService.execute({ to: stage.order.clientPhone, from: "+14155238886", body });

    return response.json(classToClass(stage));
  }
}
