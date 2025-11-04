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

const getAllInstitutions = async () => {
    try {
      const institutions = await institutionModel.Institution.find()
  
      // console.log("Institutions found: ", institutions)
      return institutions
    } catch (err) {
      throw new Error(`[Service] Database query failed: ${err.message}`);
    }
}

const checkIfExistsByName = async  (institutionName) => {
    try {
        const institution = await institutionModel.Institution.findOne({ name: institutionName })
        if (!institution) return false
    
        return true
    } catch (err) {
        throw new Error(`Error querying db for institution: , ${err.message}`)
    }
}

const getInstitutionByName = async (instutionName) => {
    try {
        const institution = await institutionModel.Institution.findOne({ name: institutionName })
        if (!institution) throw new Error("No institution found for user")
    
        return institution
    } catch (err) {
        throw new Error(`Error querying db for institution:  ${err.message}`)
    }
}

const createInstitution = async (
  name, slug, domain, country, city, contactEmail, phoneNumber
) => {
  try {
    const newInstitution = await institutionModel.Institution.create({
      name, slug, domain, country, city, contactEmail, phoneNumber, status: "active"
    })

    if (!newInstitution) {
      throw new Error(`No new institution was made with model, ${err.message}`)
    }

    return newInstitution
  } catch (err) {
    throw new Error(`Error creating institution in service layer: ${err.message}`)
  }
}

const institutionService = {
  getInstitutionById,
  getAllInstitutions,
  checkIfExistsByName,
  getInstitutionByName,
  createInstitution
}

export default institutionService