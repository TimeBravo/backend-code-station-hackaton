import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "@modules/users/infra/typeorm/models/User";

export default interface IUserRepository {
  findById(id: string): Promise<User | undefined>;

  findByEmail(email: string): Promise<User | undefined>;

  create(data: ICreateUserDTO): Promise<User>;

  save(user: User): Promise<User>;
}