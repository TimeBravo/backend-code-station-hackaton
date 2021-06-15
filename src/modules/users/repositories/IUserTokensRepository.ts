import UserToken from "../infra/typeorm/models/UserToken";

export default interface IUserTokenRepository {
  generate(userId: string): Promise<UserToken>;

  findByToken(token: string): Promise<UserToken | undefined>;
}
