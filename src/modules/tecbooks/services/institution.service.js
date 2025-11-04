import userModel from "#src/shared/models/user.model.js"
import institutionModel from "#src/shared/models/institution.model.js"
import { DatabaseError, NotFoundError } from "#src/utils/errors/AppError.js"

const getInstitutionById = async (institutionId) => {
  try {
    const institution = await institutionModel.Institution.findById(institutionId)
    
    if (!institution) {
      throw new NotFoundError(`Institution with id ${institutionId} not found`)
    }

    return institution
  } catch (err) {
    if (err.statusCode) throw err; // Re-throw if already an AppError
    
    console.error("[Service] Error getting institution by id:", err);
    throw new DatabaseError(`Failed to query institution: ${err.message}`, err)
  }
};

const getAllInstitutions = async () => {
    try {
      const institutions = await institutionModel.Institution.find()
      return institutions
    } catch (err) {
      console.error("[Service] Error getting all institutions:", err);
      throw new DatabaseError(`Failed to get all institutions: ${err.message}`, err);
    }
}

const checkIfExistsByName = async  (institutionName) => {
    try {
        const institution = await institutionModel.Institution.findOne({ name: institutionName })
        return !!institution
    } catch (err) {
        console.error("[Service] Error checking if institution exists by name:", err);
        throw new DatabaseError(`Failed to check if institution exists: ${err.message}`, err)
    }
}

const getInstitutionByName = async (institutionName) => {
    try {
        const institution = await institutionModel.Institution.findOne({ name: institutionName })
        
        if (!institution) {
            throw new NotFoundError(`Institution with name "${institutionName}" not found`)
        }
    
        return institution
    } catch (err) {
        if (err.statusCode) throw err; // Re-throw if already an AppError
        
        console.error("[Service] Error getting institution by name:", err);
        throw new DatabaseError(`Failed to query institution by name: ${err.message}`, err)
    }
}

const createInstitution = async (
  name, slug, domain, country, city, contactEmail, phoneNumber
) => {
  try {
    const newInstitution = await institutionModel.Institution.create({
      name, slug, domain, country, city, contactEmail, phoneNumber, status: "active"
    })

    return newInstitution
  } catch (err) {
    console.error("[Service] Error creating institution:", err);
    
    // Handle duplicate key errors (e.g., unique constraint violations)
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || 'field';
      throw new DatabaseError(`Institution with this ${field} already exists`, err);
    }
    
    throw new DatabaseError(`Failed to create institution: ${err.message}`, err)
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