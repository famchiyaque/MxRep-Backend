const  loginService = require("../../services/tecbooks/auth.service.js");

exports.loginUseCase = async (email, password) => {
  // Placeholder function to simulate user login
  // In a real implementation, this would query the database

    // Service 1: findUser
    const response = await loginService.findUser(email, password); 

    if (response.message !== "success") {
      throw new Error("Authentication failed");
    }

    const user = response.user;
    const institutionDetails = response.institutionDetails;

    return { user, institutionDetails };
};
