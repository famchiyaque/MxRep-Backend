import professorModel from "#src/shared/models/professorRequest.model.js"
import userModel from "#src/shared/models/user.model.js";
import { DatabaseError } from "#src/utils/errors/AppError.js"

const createUser = async (
    institutionId, email, firstNames, lastNames, role, department
  ) => {
    try {
      const user = await userModel.User.create({
        institutionId, email, firstNames, lastNames, role, department, needsToConfigurePass: true
      })

      return user
    } catch (err) {
      console.error("[Service] Error creating user:", err);
      
      // Handle duplicate key errors (e.g., unique email)
      if (err.code === 11000) {
        const field = Object.keys(err.keyPattern || {})[0] || 'field';
        throw new DatabaseError(`User with this ${field} already exists`, err);
      }
      
      throw new DatabaseError(`Failed to create user: ${err.message}`, err)
    }
};

// const finalizeUser = async (

// )

const userService = {
    createUser,
}

export default userService