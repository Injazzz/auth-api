const PasswordHash = require("../PasswordHash");

describe("PasswordHash interface", () => {
  it("should throw error when invoke abctract behavior", async () => {
    //Arrange
    const passwordHash = new PasswordHash();

    //Action and Assert
    await expect(passwordHash.hash("dummy_password")).rejects.toThrowError(
      "PASSWORD_HASH.METHOD_NOT_IMPLEMENTED"
    );
  });
});
