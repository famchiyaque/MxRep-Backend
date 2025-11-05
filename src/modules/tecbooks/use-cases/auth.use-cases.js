import authService from "../services/auth.service.js"
import institutionService from "../services/emails/institution.service.js"

const login = async (email, password) => {
  try {
    // Service 1: find and return user
    const user = await authService.findUser(email)

    // Service 2: validate password
    await authService.validatePasswordHash(user, password)

    // Service 3: query institution by id
    const institutionId = user.institutionId
    const institution = await institutionService.getInstitutionById(institutionId)

    return { user, institution }
  } catch (err) {
    throw new Error(`Error in login use-case , ${err.message}`)
  }
};

const authUseCases = {
  login
}

export default authUseCases