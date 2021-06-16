import User from "@modules/users/infra/typeorm/entities/User";
import IHashProvider from "@modules/users/providers/hashProvider/models/IHashProvider";
import { injectable, inject } from "tsyringe";

import ICacheProvider from "@shared/container/providers/cacheProvider/models/ICacheProvider";
import AppError from "@shared/errors/AppError";

import IUserRepository from "../repositories/IUserRepository";

interface IRequest {
  name: string;

  email: string;

  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("E-mail already used");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,

      email,

      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix("providers-list");

    return user;
  }
}

export default CreateUserService;
