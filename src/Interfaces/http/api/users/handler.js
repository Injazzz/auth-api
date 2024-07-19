const AddUserUseCase = require("../../../../Applications/use-cases/AddUserUseCase");
const DomainErrorTranslator = require("../../../../Commons/exceptions/DomainErrorTranslator");
const ClientError = require("../../../../Commons/exceptions/ClientError");

class UsersHandler {
  constructor(container) {
    this._container = container;

    //bind method
    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(request.payload);
    const response = h.response({
      status: "success",
      data: {
        addedUser,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;
