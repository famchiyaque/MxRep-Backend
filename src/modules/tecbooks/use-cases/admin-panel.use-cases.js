import professorRequestService from "../services/professorRequest.service.js";
import userService from "../services/user.service.js";
import institutionService from "../services/institution.service.js";
import { BadRequestError, NotFoundError } from "#src/utils/errors/AppError.js";

const getUserById = async (userId) => {
  const user = await userService.getUserById(userId);
  return user;
};

const getInbox = async (institutionId) => {
  // Get all pending professor requests for this institution
  const requests = await professorRequestService.getProfessorRequestsByInstitution(institutionId);
  return requests;
};

const getProfessorRequestById = async (requestId) => {
  const request = await professorRequestService.getProfessorRequestById(requestId);
  return request;
};

const approveProfessorRequest = async (requestId, institutionId) => {
  // Service 1: Get the professor request
  const request = await professorRequestService.getProfessorRequestById(requestId);
  
  // Verify the request belongs to this institution
  if (request.institutionId.toString() !== institutionId.toString()) {
    throw new BadRequestError("This request does not belong to your institution");
  }

  // Verify request is still pending
  if (request.status !== 'pending') {
    throw new BadRequestError(`Request is already ${request.status}`);
  }

  // Service 2: Check if user with this email already exists
  const emailExists = await userService.checkEmailExists(request.email);
  if (emailExists) {
    throw new BadRequestError("A user with this email already exists");
  }

  // Service 3: Create the user
  const newUser = await userService.createUser(
    institutionId,
    request.email,
    request.firstNames,
    request.lastNames,
    request.role || 'professor',
    request.department,
    false // isAdmin
  );

  // Service 4: Update professor request status to approved
  await professorRequestService.approveProfessorRequest(requestId);

  // Service 5: Get institution name for email
  const institution = await institutionService.getInstitutionById(institutionId);

  return {
    user: newUser,
    institutionName: institution.name
  };
};

const declineProfessorRequest = async (requestId, institutionId) => {
  // Service 1: Get the professor request
  const request = await professorRequestService.getProfessorRequestById(requestId);
  
  // Verify the request belongs to this institution
  if (request.institutionId.toString() !== institutionId.toString()) {
    throw new BadRequestError("This request does not belong to your institution");
  }

  // Verify request is still pending
  if (request.status !== 'pending') {
    throw new BadRequestError(`Request is already ${request.status}`);
  }

  // Service 2: Update professor request status to declined
  const declinedRequest = await professorRequestService.declineProfessorRequest(requestId);

  return declinedRequest;
};

const getProfessorRequest = async (requestId, institutionId) => {
  // Service 1: Get the professor request
  const request = await professorRequestService.getProfessorRequestById(requestId);
  
  // Verify the request belongs to this institution
  if (request.institutionId.toString() !== institutionId.toString()) {
    throw new BadRequestError("This request does not belong to your institution");
  }

  return request;
};

const getInstitutionProfessors = async (institutionId) => {
  // Get all professors for this institution
  const professors = await userService.getUsersByInstitutionAndRole(institutionId, 'professor');
  return professors;
};

const getInstitutionStudents = async (institutionId) => {
  // Get all students for this institution
  const students = await userService.getUsersByInstitutionAndRole(institutionId, 'student');
  return students;
};

const inviteProfessor = async (institutionId, email, firstNames, lastNames, department) => {
  // Service 1: Check if user with this email already exists
  const emailExists = await userService.checkEmailExists(email);
  if (emailExists) {
    throw new BadRequestError("A user with this email already exists");
  }

  // Service 2: Create the professor user with needsToConfigurePass = true
  const newUser = await userService.createUser(
    institutionId,
    email,
    firstNames,
    lastNames,
    'professor',
    department,
    false // isAdmin
  );

  // Service 3: Get institution name for email
  const institution = await institutionService.getInstitutionById(institutionId);

  return {
    user: newUser,
    institutionName: institution.name
  };
};

const adminPanelUseCases = {
  getUserById,
  getInbox,
  getProfessorRequest,
  getProfessorRequestById,
  approveProfessorRequest,
  declineProfessorRequest,
  inviteProfessor,
  getInstitutionProfessors,
  getInstitutionStudents,
};

export default adminPanelUseCases;

