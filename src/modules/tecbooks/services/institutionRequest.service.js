import institutionRequestModel from "#src/shared/models/institutionRequest.model.js"

const checkIfExistsByName = async  (institutionName) => {
    try {
        const institution = await institutionRequestModel.InstitutionRequest.findOne({ name: institutionName })
        return !!institution
    } catch (err) {
        throw new Error(`Error querying db for institution: , ${err.message}`)
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
      await institutionRequestModel.InstitutionRequest.create({
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
  
      return {
        success: true,
        message: "Institution request created successfully",
      };
    } catch (error) {
      console.error("Error creating institution request:", error);
      return {
        success: false,
        error: error.message,
        message: "Failed to create institution request",
      };
    }
};

const getInstitutionRequestById = async (requestId) => {
    try {
        const request = await institutionRequestModel.InstitutionRequest.findById(requestId)
        return {
            success: true,
            request
        }
    } catch (err) {
        return {
            success: false,
            error: err.message,
            message: "Failed to get institution request by id"
        }
    }
}

const getAllInstitutionRequests = async () => {
    try {
        const requests = await institutionRequestModel.InstitutionRequest.find()
        return {
            success: true,
            requests
        }
    } catch (err) {
        return {
            success: false,
            error: err.message,
            message: "Failed to get institution requests"
        }
    }
}

const approveRequest = async (requestId) => {
    try {
      // 1. Find + update in ONE atomic DB call
      const approvedRequest = await institutionRequestModel.InstitutionRequest
        .findByIdAndUpdate(
          requestId,                              // filter
          { $set: { status: 'approved' } },       // update
          { new: true, runValidators: true }      // options
        )
        .lean();   // optional – returns plain JS object (faster)
  
      // 2. If nothing matched → return a clear message
      if (!approvedRequest) {
        console.log("there was no approved request")
        return {
          success: false,
          message: 'Request not found or already processed',
        };
      }
  
      // 3. Success shape
      return {
        success: true,
        approvedRequest,
      };
    } catch (err) {
      // Mongoose validation errors, CastError, etc.
      return {
        success: false,
        error: err.message,
        message: 'Failed to approve request in service',
      };
    }
};

const declineRequest = async (requestId) => {
  try {
    // 1. Find + update in ONE atomic DB call
    const declinedRequest = await institutionRequestModel.InstitutionRequest
      .findByIdAndUpdate(
        requestId,                              // filter
        { $set: { status: 'declined' } },       // update
        { new: true, runValidators: true }      // options
      )
      .lean();   // optional – returns plain JS object (faster)

    // 2. If nothing matched → return a clear message
    if (!declinedRequest) {
      return {
        success: false,
        message: 'Request not found or already processed',
      };
    }

    // 3. Success shape
    return {
      success: true,
      declinedRequest,
    };
  } catch (err) {
    // Mongoose validation errors, CastError, etc.
    return {
      success: false,
      error: err.message,
      message: 'Failed to decline request in service',
    };
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
