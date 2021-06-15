import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ email, password }: ICreateUserDTO): Promise<User> {
    const createUser = this.repository.create({
      email,
      password,
    });

    const user = await this.repository.save(createUser);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const userEmail = await this.repository.findOne({ email });

    return userEmail;
  }

  async findById(id: string): Promise<User> {
    const userId = await this.repository.findOne(id);

    return userId;
  }
}

export { UsersRepository };
