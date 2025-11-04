// import registerServices from "../services/register.service.js"
import professorRequestService from "../services/professorRequest.service.js"
import institutionRequestService from "../services/institutionRequest.service.js"
import institutionService from "../services/institution.service.js"

const getAllInstitutions = async (decodedToken) => {
  // Service 1: Check if userId is really super admin
  // As per request, skipping this for now.
  // const { userId, role } = decodedToken;
  // if (role !== "super-admin") {
  //   throw new UnauthorizedError("User is not a super-admin");
  // }
  const institutions = await institutionService.getAllInstitutions();
  return institutions;
}

const getInstitutionById = async (institutionId) => {
  const institution = await institutionService.getInstitutionById(institutionId);
  return institution;
}

const getInbox = async (decodedToken) => {
  // Service 1: Check if userId is really super admin
  // As per request, skipping this for now.
  // const { userId, role } = decodedToken;
  // if (role !== "super-admin") {
  //   throw new UnauthorizedError("User is not a super-admin");
  // }

  // Service 2: Get all Institution Requests
  // Let errors bubble up from service layer
  const requests = await institutionRequestService.getAllInstitutionRequests();
  return requests;
}

const getInstitutionRequest = async (requestId) => {
  // Service 1: check is user really is super admin
  // coming soon ...

  // Service 2: Find institution request by id
  // Let errors bubble up from service layer
  const request = await institutionRequestService.getInstitutionRequestById(requestId)
  return request
}

const approveInstitutionRequest = async (requestId) => {
  // Service 1: Check if userId really is super admin with token
  // coming soon...

  // Service 2: Update the request status to approved
  // Let errors bubble up from service layer
  const approvedRequest = await institutionRequestService.approveRequest(requestId)
  return approvedRequest
}

const createInstitution = async (
  name, slug, domain, country, city, contactEmail, phoneNumber
) => {
  // Service 1: validate userId = super-admin, honestly I should make this a middleware god dang
  // Let errors bubble up from service layer
  const newInstitution = await institutionService.createInstitution(
    name, slug, domain, country, city, contactEmail, phoneNumber
  )

  return newInstitution
}

const declineInstitutionRequest = async (requestId) => {
  // Service 1: Check if userId really is super admin with token
  // coming soon...

  // Service 2: Update the request status to declined
  // Let errors bubble up from service layer
  const declinedRequest = await institutionRequestService.declineRequest(requestId)
  return declinedRequest
}

const superAdminPanelUseCases = {
    getAllInstitutions,
    getInstitutionById,
    getInbox,
    getInstitutionRequest,
    approveInstitutionRequest,
    createInstitution,
    declineInstitutionRequest
}

export default superAdminPanelUseCases
