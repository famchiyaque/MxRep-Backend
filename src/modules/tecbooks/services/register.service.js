import institutionModel from "#src/shared/models/institution.model.js"
import professorRequestModel from "#src/shared/models/professorRequest.model.js"
import userModel from "#src/shared/models/user.model.js"

const getAllInstitutions = async () => {
  try {
    const institutions = await institutionModel.Institution.find()

    // console.log("Institutions found: ", institutions)
    return institutions
  } catch (err) {
    throw new Error(`[Service] Database query failed: ${err.message}`);
  }
}

const createProfessorRequest = async (
  email,
  institutionId,
  firstNames,
  lastNames,
  department,
  institutionName
) => {
  try {
    // Validate institution exists
    const institution = await institutionModel.findById(institutionId);
    if (!institution || institution.name !== institutionName) {
      throw new Error("Institution not found");
    }

    // Create professor name from first and last names
    const professorName = `${firstNames} ${lastNames}`.trim();

    // Create new professor request
    const newProfessorRequest = await professorRequestModel.create({
      institutionId: institutionId,
      professorEmail: email,
      professorName: professorName,
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

const studentRequestService = async (email) => {
  // Validate institution and email exists
  try {

  await userModel.validateUniqueEmail(email);

  // Extract domain from email
  const domain = email.split('@')[1];

  // Find institution by domain
  return await institutionModel.findByDomain(domain); 

  }catch(error){
    console.log("Error creating student request", error);
    return {
      success: false,
      error: error.message,
      message: "Failed to create student request",
    };
  }
};

const registerServices = {
  getAllInstitutions,
  createProfessorRequest,
  studentRequestService,
}

export default registerServices