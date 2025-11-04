import superAdminPanelUseCases from "../use-cases/super-admin-panel.use-cases.js"
import registerUseCases from "../use-cases/register.use-cases.js";

const getInbox = async (req, res) => {
  try {
    const decodedToken = req.user; // Access decoded token from req.user

    const inbox = await superAdminPanelUseCases.getInbox(decodedToken);
    return res.status(200).json(inbox);
  } catch (err) {
    console.error("[Controller Error] get super admin inbox:", err.message);
    
    const status = err.statusCode || 500;
    const message = err.userMessage || "Internal server error";

    return res.status(status).json({ error: message });
  }
}

const getInstitutionRequest = async (req, res) => {
  try {
    const decoded = req.user
    const { requestId } = req.query
    // console.log("request id: ", requestId)

    const institutionRequest = await superAdminPanelUseCases.getInstitutionRequest(requestId)
    return res.status(200).json(institutionRequest)
  } catch (error) {
    console.erroror("Controller erroror getting institution request: ", error.message)
    const status = error.statusCode || 500;
    const message = error.userMessage || "Internal server error";
    return res.status(status).json({ error: message });
  }
}

const approveInstitutionRequest = async (req, res) => {
  try {
    const decoded = req.user
    const { requestId } = req.body
    console.log("requestId pulled from body: ", requestId)

    // Use Case 1: Approve institution request
    const approvedRequest = await superAdminPanelUseCases.approveInstitutionRequest(requestId)
    console.log("Approved request: ", approvedRequest)

    // Use Case 2: Create institution object in db
    const { name, slug, domain, country, city, contactEmail, phoneNumber } = approvedRequest
    const newInstitution = await superAdminPanelUseCases.createInstitution(
      name, slug, domain, country, city, contactEmail, phoneNumber
    )
    console.log("New institution created: ", newInstitution)

    // Use Case 3: Create first user of this new institution
    const { email, firstNames, lastNames, role, department } = approvedRequest
    const newInstitutionId = newInstitution.id
    const firstUser = await registerUseCases.createFirstInstitutionUser(
      newInstitutionId, email, firstNames, lastNames, role, department
    )
    console.log("First user of new institution: ", firstUser)

    return res.status(200).json({ success: true, message: "Institution request successfully approved, first inst admin made" })
  } catch (error) {
    console.error("[APPROVE INSTITUTION CONTROLLER] error: ", error.message)
    const status = error.statusCode || 500;
    const message = error.userMessage || "Internal server error";
    return res.status(status).json({ error: message });
  }
}

const declineInstitutionRequest = async (req, res) => {
  try {
    const decoded = req.user
    const { requestId } = req.body

    // Use Case 1: Decline institution request
    const declinedRequest = await superAdminPanelUseCases.declineInstitutionRequest(requestId)

    return res.status(200).json({ success: true, message: "Institution request successfully declined" })
  } catch (error) {
    console.error("[DECLINE INSTITUTION CONTROLLER] error: ", error.message)
    const status = error.statusCode || 500;
    const message = error.userMessage || "Internal server error";
    return res.status(status).json({ error: message });
  }
}

const superAdminControllers = {
    getInbox,
    getInstitutionRequest,
    approveInstitutionRequest,
    declineInstitutionRequest
};
  
export default superAdminControllers;
