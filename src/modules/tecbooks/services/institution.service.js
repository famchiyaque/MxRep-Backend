import userModel from "#src/shared/models/user.model.js"
import institutionModel from "#src/shared/models/institution.model.js"

const getInstitutionById = async (institutionId) => {
  try {
    const institution = await institutionModel.Institution.findById(institutionId)
    if (!institution) throw new Error("No institution found for user")

    return institution
  } catch (err) {
    throw new Error(`Error querying db for institution: , ${err.message}`)
  }
};

const institutionService = {
  getInstitutionById
}

export default institutionService