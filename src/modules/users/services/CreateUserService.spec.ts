import FakeHashProvider from "@modules/users/providers/hashProvider/fakes/FakeHashProvider";

import FakeCacheProvider from "@shared/container/providers/cacheProvider/fakes/FakeCacheProvider";
import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";

let fakeUsersRepository: FakeUsersRepository;

let fakeHashProvider: FakeHashProvider;

let fakeCacheProvider: FakeCacheProvider;

let createUser: CreateUserService;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeHashProvider = new FakeHashProvider();

    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
  });

  it("should be able to create a new user", async () => {
    const user = await createUser.execute({
      name: "John Doe",

      email: "johndoe@example.com",

      password: "123456",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new user with same email from another", async () => {
    await createUser.execute({
      name: "John Doe",

      email: "johndoe@example.com",

      password: "123456",
    });

    // Test Driven Development

    await expect(
      createUser.execute({
        name: "John Doe",

        email: "johndoe@example.com",

        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});