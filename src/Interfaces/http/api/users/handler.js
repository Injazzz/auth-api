const AddUserUseCase = require("../../../../Applications/use-cases/AddUserUseCase");

class UsersHandler {
  constructor(container) {
    this._container = container;

    //bind method
    this._postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    try {
      // Ensure the use case is properly registered and obtained
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
    } catch (error) {
      // Handle errors appropriately
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(500); // Or another appropriate status code
      return response;
    }
  }
}

module.exports = UsersHandler;
