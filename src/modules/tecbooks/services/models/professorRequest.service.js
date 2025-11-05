import professorRequestModel from "#src/shared/models/requests/professorRequest.model.js"
import { DatabaseError, ConflictError, NotFoundError } from "#src/utils/errors/AppError.js"

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

const getProfessorRequestById = async (requestId) => {
  try {
    const request = await professorRequestModel.ProfessorRequest.findById(requestId);
    
    if (!request) {
      throw new NotFoundError(`Professor request with id ${requestId} not found`);
    }

    return request;
  } catch (err) {
    if (err.statusCode) throw err; // Re-throw if already an AppError
    
    console.error("[Service] Error getting professor request by id:", err);
    throw new DatabaseError(`Failed to get professor request: ${err.message}`, err);
  }
};

const getProfessorRequestsByInstitution = async (institutionId) => {
  try {
    const requests = await professorRequestModel.ProfessorRequest.find({
      institutionId,
      status: 'pending'
    }).sort({ createdAt: -1 });

    return requests;
  } catch (err) {
    console.error("[Service] Error getting professor requests by institution:", err);
    throw new DatabaseError(`Failed to get professor requests: ${err.message}`, err);
  }
};

const approveProfessorRequest = async (requestId) => {
  try {
    const updatedRequest = await professorRequestModel.ProfessorRequest.findByIdAndUpdate(
      requestId,
      { $set: { status: 'approved' } },
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      throw new NotFoundError(`Professor request with id ${requestId} not found`);
    }

    return updatedRequest;
  } catch (err) {
    if (err.statusCode) throw err; // Re-throw if already an AppError
    
    console.error("[Service] Error approving professor request:", err);
    throw new DatabaseError(`Failed to approve professor request: ${err.message}`, err);
  }
};

const declineProfessorRequest = async (requestId) => {
  try {
    const updatedRequest = await professorRequestModel.ProfessorRequest.findByIdAndUpdate(
      requestId,
      { $set: { status: 'declined' } },
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      throw new NotFoundError(`Professor request with id ${requestId} not found`);
    }

    return updatedRequest;
  } catch (err) {
    if (err.statusCode) throw err; // Re-throw if already an AppError
    
    console.error("[Service] Error declining professor request:", err);
    throw new DatabaseError(`Failed to decline professor request: ${err.message}`, err);
  }
};

const professorRequestService = {
    createProfessorRequest,
    checkProfessorRequestExists,
    getProfessorRequestById,
    getProfessorRequestsByInstitution,
    approveProfessorRequest,
    declineProfessorRequest,
}

export default professorRequestService