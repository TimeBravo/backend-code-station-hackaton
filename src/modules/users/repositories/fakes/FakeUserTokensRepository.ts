import UserToken from "@modules/users/infra/typeorm/entities/UserToken";
import { v4 as uuidV4 } from "uuid";

import IUserTokensRepository from "../IUserTokensRepository";

export default class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(userId: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuidV4(),

      token: uuidV4(),

      user_id: userId,

      created_at: Date.now(),

      updated_at: Date.now(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find((findedToken) => findedToken.token === token);

    return userToken;
  }
}
