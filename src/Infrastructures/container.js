const { createContainer } = require("instances-container");

//external agency
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const pool = require("./database/postgres/pool");

//services (repo, helper, manager and etc)
const UserRepositoryPostgres = require("./repositories/UserRepositoryPostgres");
const BcryptPasswordHash = require("./security/BcryptPasswordHash");

//use case
const AddUserUseCase = require("../Applications/use-cases/AddUserUseCase");
const UserRepository = require("../Domains/users/UserRepository");
const PasswordHash = require("../Applications/security/PasswordHash");

//creating container
const container = createContainer();

//registering service and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
]);

//registering use case
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: UserRepository,
          internal: UserRepository.name,
        },
        {
          name: PasswordHash,
          internal: PasswordHash.name,
        },
      ],
    },
  },
]);

module.exports = container;
