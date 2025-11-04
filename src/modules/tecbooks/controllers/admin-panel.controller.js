import adminPanelUseCases from "../use-cases/admin-panel.use-cases.js";
import sendemailService from "../services/emails/email.service.js";
import generateJWT from "../services/jwt/jwt.js";

const getInbox = async (req, res) => {
  try {
    const decodedToken = req.user;
    const { institutionId } = decodedToken.body;

    const requests = await adminPanelUseCases.getInbox(institutionId);
    
    return res.status(200).json({ 
      success: true,
      data: requests 
    });
  } catch (error) {
    console.error("[Controller] Error getting admin inbox:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({ 
      success: false,
      error: message 
    });
  }
};

const getProfessorRequest = async (req, res) => {
  try {
    const decodedToken = req.user;
    const { requestId } = req.query;

    const request = await adminPanelUseCases.getProfessorRequestById(requestId);
    return res.status(200).json({ 
      success: true,
      data: request
    });
  } catch (error) {
    console.error("[Controller] Error getting professor requests:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
} 

const approveProfessorRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const decodedToken = req.user;
    const { institutionId } = decodedToken.body;

    // Step 1: Approve professor request and create user
    const result = await adminPanelUseCases.approveProfessorRequest(requestId, institutionId);

    // Step 2: Generate account setup token (2 days expiry)
    const setupToken = generateJWT({
      email: result.user.email,
      userId: result.user._id,
      type: 'professor-account-setup'
    }, "2 days");

    // Step 3: Send account setup email
    try {
      const userName = `${result.user.firstNames} ${result.user.lastNames}`;
      await sendemailService.sendMail(
        result.user.email,
        setupToken,
        'professor-account-setup',
        {
          userName,
          institutionName: result.institutionName,
          role: result.user.role
        }
      );
      console.log(`[Controller] Account setup email sent to: ${result.user.email}`);
    } catch (emailError) {
      // Log but don't fail the request if email fails
      console.error("[Controller] Failed to send setup email:", emailError);
    }

    return res.status(201).json({
      success: true,
      message: "Professor request approved successfully. Setup email sent.",
      data: {
        user: {
          id: result.user._id,
          email: result.user.email,
          firstNames: result.user.firstNames,
          lastNames: result.user.lastNames,
          role: result.user.role,
          needsToConfigurePass: result.user.needsToConfigurePass
        }
      }
    });
  } catch (error) {
    console.error("[Controller] Error approving professor request:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const declineProfessorRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const decodedToken = req.user;
    const { institutionId } = decodedToken.body;

    const declinedRequest = await adminPanelUseCases.declineProfessorRequest(requestId, institutionId);

    return res.status(200).json({
      success: true,
      message: "Professor request declined successfully",
      data: declinedRequest
    });
  } catch (error) {
    console.error("[Controller] Error declining professor request:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const getInstitutionProfessors = async (req, res) => {
  try {
    console.log("[Controller] Getting institution professors...");
    const decodedToken = req.user;
    const { institutionId } = decodedToken.body;

    const professors = await adminPanelUseCases.getInstitutionProfessors(institutionId);
    console.log("professors: ", professors);

    return res.status(200).json({
      success: true,
      data: professors,
      count: professors.length
    });
  } catch (error) {
    console.error("[Controller] Error getting institution professors:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const getInstitutionStudents = async (req, res) => {
  try {
    console.log("[Controller] Getting institution students...");
    const decodedToken = req.user;
    const { institutionId } = decodedToken.body;

    const students = await adminPanelUseCases.getInstitutionStudents(institutionId);
    console.log("students: ", students);

    return res.status(200).json({
      success: true,
      data: students,
      count: students.length
    });
  } catch (error) {
    console.error("[Controller] Error getting institution students:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const adminPanelControllers = {
  getInbox,
  getProfessorRequest,
  approveProfessorRequest,
  declineProfessorRequest,
  getInstitutionProfessors,
  getInstitutionStudents,
} 

export default adminPanelControllers
