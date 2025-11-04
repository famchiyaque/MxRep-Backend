// import registerServices from "../services/register.service.js"
import userService from "../services/user.service.js"
import professorRequestService from "../services/professorRequest.service.js"
import institutionRequestService from "../services/institutionRequest.service.js"
import institutionService from "../services/institution.service.js"
import { ConflictError } from "#src/utils/errors/AppError.js"

const getAllInstitutions = async () => {
  // Let errors bubble up from service layer
  const institutions = await institutionService.getAllInstitutions()
  return institutions
}

const createProfessorRequest = async (
  institutionName,
  email,
  firstNames,
  lastNames,
  department,
) => {
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
  // Service 1: See if institution already exists by name
  const institutionAlreadyExists = await institutionService.checkIfExistsByName(institutionName)
  if (institutionAlreadyExists) {
    throw new ConflictError("Institution already exists")
  }

  // Service 2: See if request already exists by name
  const requestAlreadyExists = await institutionRequestService.checkIfExistsByName(institutionName)
  if (requestAlreadyExists) {
    throw new ConflictError("Institution request already exists")
  }

  // Service 3: Verify information is good
  // const validInput = inst

  // Service 4: Create institution request
  const newRequest = await institutionRequestService.createInstitutionRequest(
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

  // Service 5: Call email service to alert super-admin
  // To be continued...

  return newRequest
}

const createFirstInstitutionUser = async (
  newInstitutionId, email, firstNames, lastNames, role, department
) => {
  // Let errors bubble up from service layer
  const newUser = await userService.createUser(
    newInstitutionId, email, firstNames, lastNames, role, department
  )

  return newUser
}

const registerUseCases = {
  getAllInstitutions,
  createProfessorRequest,
  createInstitutionRequest,
  createFirstInstitutionUser
}

export default registerUseCases
