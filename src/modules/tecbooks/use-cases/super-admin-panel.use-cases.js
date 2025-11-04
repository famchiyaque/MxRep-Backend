// import registerServices from "../services/register.service.js"
import professorRequestService from "../services/professorRequest.service.js"
import institutionRequestService from "../services/institutionRequest.service.js"
import institutionService from "../services/institution.service.js"

const getInbox = async (decodedToken) => {
  try {
    // Service 1: Check if userId is really super admin
    // As per request, skipping this for now.
    // const { userId, role } = decodedToken;
    // if (role !== "super-admin") {
    //   throw new Error("Unauthorized: User is not a super-admin");
    // }

    // Service 2: Get all Institution Requests
    const result = await institutionRequestService.getAllInstitutionRequests();
    // console.log("Found requests: ", result)

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch institution requests");
    }

    return result.requests;
  } catch (err) {
    console.error("[UseCase Error] get super admin inbox:", err.message);
    throw new Error(`[UseCase] Failed to fetch institutions: ${err.message}`);
  }
}

const getInstitutionRequest = async (requestId) => {
  try {
    // Service 1: check is user really is super admin
    // coming soon ...

    // Service 2: Find institution request by id
    const result = await institutionRequestService.getInstitutionRequestById(requestId)
    // console.log("result of get request by id service: ", result)

    if (!result.success) {
      throw new Error(result.message || "Failed to get institution request by id")
    }

    return result.request
  } catch (err) {
    console.log("[USE CASE err] getting institution request: ", err.message)
    throw new Error(`Failed to get institution request: ${err.message}`)
  }
}

const approveInstitutionRequest = async (requestId) => {
  try {
    // Service 1: Check if userId really is super admin with token
    // coming soon...

    // Service 2: Try to update the request from status pending to active
    const result = await institutionRequestService.approveRequest(requestId)

    if (!result.sucess) {
      throw new Error(result.message || "Failed to approve institution request")
    }

    return result.approvedRequest
  } catch (err) {
    console.log("[USE CASE err] approving institution request: ", err.message)
    throw new Error(`Failed to approve institution request: ${err.message}`)
  }
}

const createInstitution = async (
  name, slug, domain, country, city, contactEmail, phoneNumber
) => {
  try {
    // Service 1: validate userId = super-admin, honestly I should make this a middleware god dang
    const newInstitution = await institutionService.createInstitution(
      name, slug, domain, country, city, contactEmail, phoneNumber
    )

    return newInstitution
  } catch (err) {
    console.log("[USE CASE err] creating institution object in db: ", err.message)
    throw new Error(`Failed to create institution object in db: ${err.message}`)
  }
}

const declineInstitutionRequest = async (requestId) => {
  try {
    // Service 1: Check if userId really is super admin with token
    // coming soon...

    // Service 2: Try to update the request from status pending to declined
    const result = await institutionRequestService.declineRequest(requestId)

    if (!result.success) {
      throw new Error(result.message || "Failed to approve institution request")
    }

    return result.declinedRequest
  } catch (err) {
    console.log("[USE CASE err] approving institution request: ", err.message)
    throw new Error(`Failed to approve institution request: ${err.message}`)
  }
}

const superAdminPanelUseCases = {
    getInbox,
    getInstitutionRequest,
    approveInstitutionRequest,
    createInstitution,
    declineInstitutionRequest
}

export default superAdminPanelUseCases
