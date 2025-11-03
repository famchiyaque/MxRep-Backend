// import registerServices from "../services/register.service.js"
import professorRequestService from "../services/professorRequest.service.js"
import institutionRequestService from "../services/institutionRequest.service.js"
import institutionService from "../services/institution.service.js"

const getInbox = async (decoded) => {
  try {
    // Service? 1: Decode token
    const { userId, role } = decoded
    // Service 1: Check if userId is really super admin
    // coming soon...

    // Service 2: Get all Institution Requests
    const institutions = await institutionRequestService.getAllInstitutionRequests()

    return institutions
  } catch (err) {
    throw new Error(`[UseCase] Failed to fetch institutions: ${err.message}`);
  }
}

const superAdminPanelUseCases = {
    getInbox
}

export default superAdminPanelUseCases