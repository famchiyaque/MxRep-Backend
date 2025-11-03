// import registerServices from "../services/register.service.js"
import professorRequestService from "../services/professorRequest.service.js"
import institutionRequestService from "../services/institutionRequest.service.js"
import institutionService from "../services/institution.service.js"

const getAllInstitutions = async () => {
  try {
    const institutions = await institutionService.getAllInstitutions()

    return institutions
  } catch (err) {
    throw new Error(`[UseCase] Failed to fetch institutions: ${err.message}`);
  }
}

const createProfessorRequest = async (
  institutionName,
  email,
  firstNames,
  lastNames,
  department,
) => {
  try {
    // Service 1: Validate that institution exists
    const institution = await institutionService.getInstitutionByName(institutionName)
    const institutionId = institution.id
  
    // Service 2: Create the request
    await professorRequestService.professorRequestService(
      institutionId,
      email,
      firstNames,
      lastNames,
      department
    );
  
    // Service 3: Notify institution admin by email
    // to be continued...

  } catch (err) {
    throw new Error(`Error in create prof request use-case , ${err.message}`)
  }
};

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
    // Service 1: See if institution already exists by name
    const insitutionAlreadyExists = institutionService.checkIfExistsByName(institutionName)
    if (insitutionAlreadyExists) return { success: false, message: "Institution already exists" }
    console.log("[REGISTER USE CASE] institution doesn't already exist")

    // Service 2: See if request already exists by name
    const requestAlreadyExists = institutionRequestService.checkIfExistsByName(institutionName)
    if (requestAlreadyExists) return { success: false, message: "Request already exists" }
    console.log("[REGISTER USE CASE] request doesn't already exist")

    // Service 2: Verify information is good
    // const validInput = inst

    // Service 3: Create institution request
    await institutionRequestService.createInstitutionRequest(
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
    )
    console.log("[REGISTER USE CASE] got past creation call")

    // Service 4: Call email service to alert super-admin
    // To be continued...

  } catch (err) {
    throw new Error(`Error in register institution use-case , ${err.message}`)
  }
}


const registerUseCases = {
  getAllInstitutions,
  createProfessorRequest,
  createInstitutionRequest
}

export default registerUseCases