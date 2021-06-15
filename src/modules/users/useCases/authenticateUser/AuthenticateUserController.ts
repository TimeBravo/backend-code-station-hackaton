import { Request, Response } from "express";
import { container } from "tsyringe";

import AuthenticateUserService from "./AuthenticateUserService";

export default class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserService);

    const authenticateToken = await authenticateUserUseCase.execute({
      email,

      password,
    });

    return response.json(authenticateToken);
  }
}
