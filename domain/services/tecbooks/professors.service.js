const Institution =
  require("../../../infrastructure/models/institution.model").Institution;
const ProfessorRequest = require("../../../infrastructure/models/requests.model");

exports.professorRequestService = async (
  email,
  institutionId,
  firstNames,
  lastNames,
  department,
  institutionName
) => {
  try {
    // Validate institution exists
    const institution = await Institution.findById(institutionId);
    if (!institution || institution.name !== institutionName) {
      throw new Error("Institution not found");
    }

    // Create professor name from first and last names
    const professorName = `${firstNames} ${lastNames}`.trim();

    // Create new professor request
    const newProfessorRequest = await ProfessorRequest.create({
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
