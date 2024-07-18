const UserTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const InvariantError = require("../../../Commons/exceptions/InvariantError");
const RegisterUser = require("../../../Domains/users/entities/RegisterUser");
const RegisteredUser = require("../../../Domains/users/entities/RegisteredUser");
const pool = require("../../database/postgres/pool");
const UserRepositoryPostgres = require("../UserRepositoryPostgres");

describe("UserRepositoryPostgres", () => {
  afterEach(async () => {
    await UserTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("verify available username function", () => {
    it("should throw Invariant error when username not available", async () => {
      //Arrange
      await UserTableTestHelper.addUser({ username: "kamal" }); //memasukan user baru dengan username kamal
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      //Action and Assert
      await expect(
        userRepositoryPostgres.verifyAvailableUsername("kamal")
      ).rejects.toThrowError(InvariantError);
    });

    it("should not throw Invariant error when username available", async () => {
      //Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      //Action and Assert
      await expect(
        userRepositoryPostgres.verifyAvailableUsername("kamal")
      ).resolves.not.toThrowError(InvariantError);
    });
  });

  describe("addUser function", () => {
    it("should persist register user", async () => {
      //Arrange
      const registerUser = new RegisterUser({
        username: "kamal",
        password: "secret_password",
        fullname: "kamal akbar",
      });

      const fakeIdGenerator = () => "123"; //stub!
      const userRepositoryPostgres = new UserRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      //Action
      await userRepositoryPostgres.addUser(registerUser);

      //Assert
      const user = await UserTableTestHelper.findUserById("user-123");
      expect(user).toHaveLength(1);
    });

    it("should return registered user correctly", async () => {
      //Arrange
      const registerUser = new RegisterUser({
        username: "kamal",
        password: "secret_password",
        fullname: "kamal akbar",
      });

      const fakeIdGenerator = () => "123"; //stub!
      const userRepositoryPostgres = new UserRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      //Action
      const registeredUser = await userRepositoryPostgres.addUser(registerUser);

      //Assert
      expect(registeredUser).toStrictEqual(
        new RegisteredUser({
          id: "user-123",
          username: "kamal",
          fullname: "kamal akbar",
        })
      );
    });
  });
});
