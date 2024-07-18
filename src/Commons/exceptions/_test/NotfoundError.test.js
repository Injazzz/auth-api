const NotfoundError = require("../NotfoundError");

describe("NotfoundError", () => {
  it("should create error correctly", () => {
    const notfoundError = new NotfoundError("not found!");

    expect(notfoundError.statusCode).toEqual(404);
    expect(notfoundError.message).toEqual("not found!");
    expect(notfoundError.name).toEqual("NotfoundError");
  });
});
