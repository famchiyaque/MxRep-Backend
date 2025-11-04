import professorRequestModel from "#src/shared/models/professorRequest.model.js"
import { DatabaseError, ConflictError } from "#src/utils/errors/AppError.js"

const createProfessorRequest = async (
    institutionId,
    email,
    firstNames,
    lastNames,
    department
  ) => {
    try {
      const newRequest = await professorRequestModel.ProfessorRequest.create({
        institutionId,
        email,
        firstNames,
        lastNames,
        department,
        status: "pending"
      });

      return newRequest;
    } catch (err) {
      console.error("[Service] Error creating professor request:", err);
      
      // Handle duplicate key errors
      if (err.code === 11000) {
        throw new ConflictError("A professor request with this email already exists for this institution");
      }
      
      throw new DatabaseError(`Failed to create professor request: ${err.message}`, err);
    }
};

const checkProfessorRequestExists = async (institutionId, email) => {
  try {
    const request = await professorRequestModel.ProfessorRequest.findOne({ 
      institutionId, 
      email,
      status: "pending" 
    });
    return !!request;
  } catch (err) {
    console.error("[Service] Error checking professor request existence:", err);
    throw new DatabaseError(`Failed to check professor request: ${err.message}`, err);
  }
};

const professorRequestService = {
    createProfessorRequest,
    checkProfessorRequestExists,
}

export default professorRequestService