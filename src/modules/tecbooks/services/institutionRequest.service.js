import institutionRequestModel from "#src/shared/models/institutionRequest.model.js"

const checkIfExistsByName = async  (institutionName) => {
    try {
        const institution = await institutionRequestModel.Institution.findOne({ name: institutionName })
        if (!institution) return false
    
        return true
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
      await institutionRequestModel.create({
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
        data: newProfessorRequest,
        message: "Professor request created successfully",
      };
    } catch (error) {
      console.error("Error creating professor request:", error);
      return {
        success: false,
        error: error.message,
        message: "Failed to create professor request",
      };
    }
};

const institutionRequestService = {
    checkIfExistsByName,
    createInstitutionRequest
}

export default institutionRequestService