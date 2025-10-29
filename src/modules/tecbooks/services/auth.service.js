import userModel from "#src/shared/models/user.model.js"
import institutionModel from "#src/shared/models/institution.model.js"

const findUser = async (email, password) => {
  
    // 1. find user, return user

    const user = await userModel.findByEmail(email, password);
    if (!user) return { message: "No User found" ,user: null, institution: null };

    // 2. get basic institution details
    const institutionDetails = await institutionModel.findById(user.institutionId);
    if (!institutionDetails) return { message: "No institution details found", institutionDetails: null };

    return {
      message: "success",
      user: user,
      institution: institutionDetails,
    };
};

const authService = {
  findUser
}

export default authService