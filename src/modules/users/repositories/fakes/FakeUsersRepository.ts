import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "@modules/users/infra/typeorm/models/User";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import { v4 as uuidV4 } from "uuid";

class UsersRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findedUser = this.users.find((findedUser) => findedUser.id === id);

    return findedUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findedUser = this.users.find((user) => user.email === email);

    return findedUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuidV4() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findedIndex = this.users.findIndex((findedUser) => findedUser.id === user.id);

    this.users[findedIndex] = user;

    return user;
  }
}

export default UsersRepository;
