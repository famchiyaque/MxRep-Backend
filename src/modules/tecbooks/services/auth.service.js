import bcrypt from 'bcryptjs'
import userModel from "#src/shared/models/actors/user.model.js"

const findUser = async (email) => {
  try {
    const user = await userModel.User.findOne({ email })
    if (!user) throw new Error("No user found with given email")

    return user
  } catch (err) {
    throw new Error(`Error querying db for user , ${err.message}`)
  }
};

const validatePasswordHash = async (user, password) => {
  try {
    const hash = user.passwordHash
    if (!hash) throw new Error("No password hash on user")

    const isMatch = await bcrypt.compare(password, hash)
    if (!isMatch) throw new Error("Wrong password")

  } catch (err) {
    throw new Error(`Error validating password hash: , ${err.message}`)
  }
}

const authService = {
  findUser,
  validatePasswordHash
}

export default authService