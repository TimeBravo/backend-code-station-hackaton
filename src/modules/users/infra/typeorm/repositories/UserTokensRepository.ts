import UserToken from "@modules/users/infra/typeorm/models/UserToken";
import IUsersTokenRepository from "@modules/users/repositories/IUserTokensRepository";
import { Repository, getRepository } from "typeorm";
import { v4 as uuidV4 } from "uuid";

class UserTokensRepository implements IUsersTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({ where: { token } });

    return userToken;
  }

  public async generate(userID: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      userID,

      token: uuidV4(),
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
