import superAdminPanelUseCases from "../use-cases/super-admin-panel.use-cases.js"
import registerUseCases from "../use-cases/register.use-cases.js";
import sendemailService from "../services/emails/email.service.js"
import generateJWT from "../services/jwt/jwt.js"

const getAllInstitutions = async (req, res) => {
  try {
    const decodedToken = req.user;
    const institutions = await superAdminPanelUseCases.getAllInstitutions(decodedToken);
    return res.status(200).json({
      success: true,
      data: institutions
    });
  } catch (error) {
    console.error("[Controller] Error getting institution request:", error)
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({ 
      success: false,
      error: message 
    });
  }
}

const getInstitutionById = async (req, res) => {
  try {
    const { institutionId } = req.query
    const institution = await superAdminPanelUseCases.getInstitutionById(institutionId);
    return res.status(200).json({
      success: true,
      data: institution
    });
  } catch (error) {
    console.error("[Controller] Error getting institution by id:", error)
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({ 
      success: false,
      error: message 
    });
  }
}

const getInbox = async (req, res) => {
  try {
    const decodedToken = req.user;

    const inbox = await superAdminPanelUseCases.getInbox(decodedToken);
    
    return res.status(200).json({
      success: true,
      data: inbox
    });
  } catch (err) {
    console.error("[Controller] Error getting super admin inbox:", err);
    
    const status = err.statusCode || 500;
    const message = err.message || "Internal server error";

    return res.status(status).json({ 
      success: false,
      error: message 
    });
  }
}

const getInstitutionRequest = async (req, res) => {
  try {
    const { requestId } = req.query

    const institutionRequest = await superAdminPanelUseCases.getInstitutionRequest(requestId)
    
    return res.status(200).json({
      success: true,
      data: institutionRequest
    })
  } catch (error) {
    console.error("[Controller] Error getting institution request:", error)
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({ 
      success: false,
      error: message 
    });
  }
}

const approveInstitutionRequest = async (req, res) => {
  try {
    const { requestId } = req.body

    // Step 1: Approve institution request (updates status to 'approved')
    const approvedRequest = await superAdminPanelUseCases.approveInstitutionRequest(requestId)

    // Step 2: Create institution in database
    const { name, slug, domain, country, city, contactEmail, phoneNumber } = approvedRequest
    const newInstitution = await superAdminPanelUseCases.createInstitution(
      name, slug, domain, country, city, contactEmail, phoneNumber
    )

    // Step 3: Create first user (admin) for this institution
    const { email, firstNames, lastNames, role, department } = approvedRequest
    const newInstitutionId = newInstitution.id
    const firstUser = await registerUseCases.createFirstInstitutionUser(
      newInstitutionId, email, firstNames, lastNames, role, department
    )

    // Step 4: Generate account setup token (2 days expiry)
    const setupToken = generateJWT({
      email: firstUser.email,
      userId: firstUser._id,
      type: 'admin-account-setup'
    }, "2 days");

    // Step 5: Send account setup email
    try {
      const userName = `${firstUser.firstNames} ${firstUser.lastNames}`;
      await sendemailService.sendMail(
        firstUser.email,
        setupToken,
        'admin-account-setup',
        {
          userName,
          institutionName: newInstitution.name,
          role: firstUser.role
        }
      );
      console.log(`[Controller] Account setup email sent to: ${firstUser.email}`);
    } catch (emailError) {
      // Log but don't fail the request if email fails
      console.error("[Controller] Failed to send setup email:", emailError);
    }

    return res.status(201).json({ 
      success: true, 
      message: "Institution approved and created successfully. Setup email sent to admin.",
      data: {
        institution: newInstitution,
        user: {
          id: firstUser._id,
          email: firstUser.email,
          firstNames: firstUser.firstNames,
          lastNames: firstUser.lastNames,
          role: firstUser.role,
          needsToConfigurePass: firstUser.needsToConfigurePass
        }
      }
    })
  } catch (error) {
    console.error("[Controller] Error approving institution request:", error)
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({ 
      success: false,
      error: message 
    });
  }
}

const declineInstitutionRequest = async (req, res) => {
  try {
    const { requestId } = req.body

    // Decline institution request (updates status to 'declined')
    const declinedRequest = await superAdminPanelUseCases.declineInstitutionRequest(requestId)

    return res.status(200).json({ 
      success: true, 
      message: "Institution request successfully declined",
      data: declinedRequest
    })
  } catch (error) {
    console.error("[Controller] Error declining institution request:", error)
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({ 
      success: false,
      error: message 
    });
  }
}

const superAdminControllers = {
    getAllInstitutions,
    getInstitutionById,
    getInbox,
    getInstitutionRequest,
    approveInstitutionRequest,
    declineInstitutionRequest
};
  
export default superAdminControllers;
