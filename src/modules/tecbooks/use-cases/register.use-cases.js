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
  institution,
  email,
  firstNames,
  lastNames,
  department,
  emailService
) => {
  const institutionId = institution.id;
  
  // Service 1: Verify institution exists in database (security check)
  await institutionService.getInstitutionById(institutionId);

  // Service 2: Check if user already exists with this email
  const userExists = await userService.checkEmailExists(email);
  if (userExists) {
    throw new ConflictError("A user with this email already exists");
  }

  // Service 3: Check if there's already a pending request
  const requestExists = await professorRequestService.checkProfessorRequestExists(institutionId, email);
  if (requestExists) {
    throw new ConflictError("A pending professor request already exists for this email");
  }

  // Service 4: Create the professor request
  const newRequest = await professorRequestService.createProfessorRequest(
    institutionId,
    email,
    firstNames,
    lastNames,
    department
  );

  // Service 5: Find institution admins
  const admins = await userService.getInstitutionAdmins(institutionId);
  
  if (admins.length === 0) {
    console.warn(`[Use Case] No admins found for institution ${institutionId}. Skipping email notification.`);
    return newRequest;
  }

  // Service 6: Send email notification to all admins
  const professorFullName = `${firstNames} ${lastNames}`;
  
  for (const admin of admins) {
    try {
      const adminFullName = `${admin.firstNames} ${admin.lastNames}`;
      await emailService.sendMail(
        admin.email,
        null, // No token needed for this email type
        'professor-request-notification',
        {
          adminName: adminFullName,
          professorName: professorFullName,
          professorEmail: email,
          department: department || 'Not specified',
          institutionSlug: institution.slug
        }
      );
      console.log(`[Use Case] Notification email sent to admin: ${admin.email}`);
    } catch (emailError) {
      // Log but don't fail the request if email fails
      console.error(`[Use Case] Failed to send email to admin ${admin.email}:`, emailError);
    }
  }

  return newRequest;
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

const verifyAccountSetupToken = async (userId, email) => {
  // Service 1: Find user by ID and email
  const user = await userService.getUserById(userId);
  
  // Service 2: Verify email matches
  if (user.email !== email) {
    throw new BadRequestError("Token email does not match user email");
  }

  // Service 3: Check if user still needs to configure password
  if (!user.needsToConfigurePass) {
    throw new ConflictError("Account has already been set up");
  }

  // Return user data for frontend
  return {
    email: user.email,
    firstNames: user.firstNames,
    lastNames: user.lastNames,
    role: user.role,
    institutionId: user.institutionId
  };
};

const completeAccountSetup = async (userId, email, password) => {
  // Service 1: Find user and verify they need setup
  const user = await userService.getUserById(userId);
  
  if (user.email !== email) {
    throw new BadRequestError("Token email does not match user email");
  }

  if (!user.needsToConfigurePass) {
    throw new ConflictError("Account has already been set up");
  }

  // Service 2: Hash password
  const passwordHash = await userService.hashPassword(password);

  // Service 3: Update user with password and mark as configured
  const updatedUser = await userService.completeUserSetup(userId, passwordHash);

  return updatedUser;
};

const registerUseCases = {
  getAllInstitutions,
  createProfessorRequest,
  createStudentRequest,
  checkEmailAvailability,
  finalizeStudentRegistration,
  verifyAccountSetupToken,
  completeAccountSetup,
  createInstitutionRequest,
  createFirstInstitutionUser
}

export default registerUseCases
