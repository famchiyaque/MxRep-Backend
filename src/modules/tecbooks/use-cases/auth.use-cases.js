import loginService from "../services/auth.service.js"

const login = async (email, password) => {
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

const authUseCases = {
  login
}

export default authUseCases