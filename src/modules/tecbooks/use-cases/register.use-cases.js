// import registerServices from "../services/register.service.js"
import userService from "../services/user.service.js"
import professorRequestService from "../services/professorRequest.service.js"
import institutionRequestService from "../services/institutionRequest.service.js"
import institutionService from "../services/institution.service.js"
import { ConflictError, BadRequestError } from "#src/utils/errors/AppError.js"

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

const createStudentRequest = async (email, institution) => {
  // Service 1: Check if email is already registered
  const emailExists = await userService.checkEmailExists(email);
  if (emailExists) {
    throw new ConflictError("Email is already registered");
  }

  // Service 2: Validate email domain matches institution domain
  const emailDomain = email.split('@')[1];
  if (emailDomain !== institution.domain) {
    throw new BadRequestError(`Email domain must match institution domain: ${institution.domain}`);
  }

  // Service 3: Verify institution exists in database (security check)
  await institutionService.getInstitutionById(institution.id);
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

const checkEmailAvailability = async (email) => {
  // Check if email is already registered
  const emailExists = await userService.checkEmailExists(email);
  return emailExists;
}

const finalizeStudentRegistration = async (
  institutionId, email, firstNames, lastNames, password, department
) => {
  // Service 1: Double-check email is still available (race condition protection)
  const emailExists = await userService.checkEmailExists(email);
  if (emailExists) {
    throw new ConflictError("Email has already been registered");
  }

  // Service 2: Hash password
  const passwordHash = await userService.hashPassword(password);

  // Service 3: Create student user with hashed password
  const newStudent = await userService.createStudentWithPassword(
    institutionId,
    email,
    firstNames,
    lastNames,
    passwordHash,
    department
  );

  return newStudent;
}

const registerUseCases = {
  getAllInstitutions,
  createProfessorRequest,
  createStudentRequest,
  checkEmailAvailability,
  finalizeStudentRegistration,
  createInstitutionRequest,
  createFirstInstitutionUser
}

export default registerUseCases
