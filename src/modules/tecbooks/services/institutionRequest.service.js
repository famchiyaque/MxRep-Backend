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

const institutionRequestService = {
    checkIfExistsByName,
    createInstitutionRequest
}

export default institutionRequestService