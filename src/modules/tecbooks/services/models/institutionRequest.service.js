import institutionRequestModel from "#src/shared/models/requests/institutionRequest.model.js"
import { DatabaseError, NotFoundError } from "#src/utils/errors/AppError.js"

const checkIfExistsByName = async  (institutionName) => {
    try {
        const institution = await institutionRequestModel.InstitutionRequest.findOne({ name: institutionName })
        return !!institution
    } catch (err) {
        throw new DatabaseError(`Failed to query institution request by name: ${err.message}`, err)
    }
}
  
const createInstitutionRequest = async (
    institutionName,
    slug,
    domain,
    city,
    country,
    contactEmail,
    phoneNumber,
    email,
    firstNames,
    lastNames,
    role,
    department
) => {
    try {
      const newRequest = await institutionRequestModel.InstitutionRequest.create({
        name: institutionName,
        slug,
        domain,
        city,
        country,
        contactEmail,
        phoneNumber,
        email,
        firstNames,
        lastNames,
        role,
        department,
        status: "pending",
      });
  
      return newRequest;
    } catch (error) {
      console.error("[Service] Error creating institution request:", error);
      throw new DatabaseError(`Failed to create institution request: ${error.message}`, error);
    }
};

const getInstitutionRequestById = async (requestId) => {
    try {
        const request = await institutionRequestModel.InstitutionRequest.findById(requestId)
        
        if (!request) {
            throw new NotFoundError(`Institution request with id ${requestId} not found`)
        }
        
        return request
    } catch (err) {
        if (err.statusCode) throw err; // Re-throw if already an AppError
        
        console.error("[Service] Error getting institution request by id:", err);
        throw new DatabaseError(`Failed to get institution request by id: ${err.message}`, err)
    }
}

const getAllInstitutionRequests = async () => {
    try {
        const requests = await institutionRequestModel.InstitutionRequest.find()
        return requests
    } catch (err) {
        console.error("[Service] Error getting all institution requests:", err);
        throw new DatabaseError(`Failed to get institution requests: ${err.message}`, err)
    }
}

const approveRequest = async (requestId) => {
    try {
      // Find + update in ONE atomic DB call
      const approvedRequest = await institutionRequestModel.InstitutionRequest
        .findByIdAndUpdate(
          requestId,
          { $set: { status: 'approved' } },
          { new: true, runValidators: true }
        )
        .lean();
  
      // If nothing matched, throw NotFoundError
      if (!approvedRequest) {
        throw new NotFoundError('Institution request not found or already processed');
      }
  
      return approvedRequest;
    } catch (err) {
      if (err.statusCode) throw err; // Re-throw if already an AppError
      
      console.error("[Service] Error approving request:", err);
      throw new DatabaseError(`Failed to approve request: ${err.message}`, err);
    }
};

const declineRequest = async (requestId) => {
  try {
    // Find + update in ONE atomic DB call
    const declinedRequest = await institutionRequestModel.InstitutionRequest
      .findByIdAndUpdate(
        requestId,
        { $set: { status: 'declined' } },
        { new: true, runValidators: true }
      )
      .lean();

    // If nothing matched, throw NotFoundError
    if (!declinedRequest) {
      throw new NotFoundError('Institution request not found or already processed');
    }

    return declinedRequest;
  } catch (err) {
    if (err.statusCode) throw err; // Re-throw if already an AppError
    
    console.error("[Service] Error declining request:", err);
    throw new DatabaseError(`Failed to decline request: ${err.message}`, err);
  }
};

const institutionRequestService = {
    checkIfExistsByName,
    createInstitutionRequest,
    getInstitutionRequestById,
    getAllInstitutionRequests,
    approveRequest,
    declineRequest
}

export default institutionRequestService
