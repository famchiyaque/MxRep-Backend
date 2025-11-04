import professorModel from "#src/shared/models/professorRequest.model.js"
import userModel from "#src/shared/models/user.model.js";

const createUser = async (
    institutionId, email, firstNames, lastNames, role, department
  ) => {
    try {
      const user = await userModel.User.create({
        institutionId, email, firstNames, lastNames, role, department, needsToConfigurePass: true
      })

      if (!user) {
        throw new Error("Failed to create new user in atomic service: ")
      }

      return user
    } catch (err) {
      throw new Error(`Error creating professor request in service: , ${err.message}`)
    }
};

// const finalizeUser = async (

// )

const userService = {
    createUser,
}

export default userService