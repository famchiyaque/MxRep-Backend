import registerUseCases from "../use-cases/register.use-cases.js";
import sendemailService from "../services/emails/email.service.js"
import generateJWT from "../services/jwt/jwt.js"

const getAllInstitutions = async (req, res) => {
  try {
    const institutions = await registerUseCases.getAllInstitutions()
    
    return res.status(200).json({
      success: true,
      data: institutions
    });
  } catch (err) {
    console.error("[Controller] Error getting all institutions:", err);
    
    const status = err.statusCode || 500;
    const message = err.message || "Internal server error";

    return res.status(status).json({ 
      success: false,
      error: message 
    });
  }
}

const createProfessorRequest = async (req, res) => {
  try {
    const { email, institution, firstNames, lastNames, department } = req.body
    console.log("email: ", email)
    console.log("institution: ", institution)
    console.log("firstNames: ", firstNames)
    console.log("lastNames: ", lastNames)
    console.log("department: ", department)

    // Validate required fields
    if (!email || !institution || !firstNames || !lastNames) {
      return res.status(400).json({
        success: false,
        error: "Email, institution, first name, and last name are required"
      });
    }

    const newRequest = await registerUseCases.createProfessorRequest(
      institution,
      email,
      firstNames,
      lastNames,
      department,
      sendemailService // Pass email service for notifications
    )

    return res.status(201).json({ 
      success: true, 
      message: "Professor request created successfully. Institution admins have been notified.",
      data: {
        requestId: newRequest._id,
        status: newRequest.status
      }
    })
  } catch (error) {
    console.error("[Controller] Error creating professor request:", error)
    
    const status = error.statusCode || 500
    const message = error.message || "Internal server error"

    return res.status(status).json({ 
      success: false,
      error: message 
    })
  }
};

const createStudentRequest = async (req, res) => {
  try {
    const { email, institution } = req.body;

    // Step 1: Validate email and domain match
    await registerUseCases.createStudentRequest(email, institution);

    // Step 2: Generate single-use JWT token with email, institution, and timestamp
    const tokenBody = { 
      email, 
      institutionId: institution.id,
      institutionName: institution.name,
      type: 'student-registration',
      timestamp: Date.now() // Helps ensure uniqueness
    }
    const token = generateJWT(tokenBody, "30 minutes")

    // Step 3: Send verification email with token
    await sendemailService.sendMail(email, token);
    
    return res.status(200).json({ 
      success: true,
      message: "Verification email sent successfully. Please check your inbox."
    });
  } catch (error) {
    console.error("[Controller] Error creating student request:", error); 
    
    const status = error.statusCode || 500
    const message = error.message || "Internal server error"
    
    return res.status(status).json({ 
      success: false,
      error: message 
    });
  }
};

const createInstitutionRequest = async (req, res) => {
  try {
    const { 
      institution,
      city, 
      country, 
      contactEmail,
      phoneNumber,
      email,
      firstNames,
      lastNames,
      role,
      department
    } = req.body
    
    const { name, slug, domain } = institution

    const newRequest = await registerUseCases.createInstitutionRequest(
      name,
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

    return res.status(201).json({ 
      success: true, 
      message: "Institution request created successfully",
      data: newRequest
    })
  } catch (error) {
    console.error("[Controller] Error creating institution request:", error)
    
    const status = error.statusCode || 500
    const message = error.message || "Internal server error"

    return res.status(status).json({ 
      success: false,
      error: message 
    })
  }
}

const verifyStudentToken = async (req, res) => {
  try {
    // Token is already verified by verifyJWT middleware
    // req.user.body contains the actual payload (JWT wraps it in 'body')
    const { email, institutionId, institutionName, type } = req.user.body;

    // Validate token type
    if (type !== 'student-registration') {
      return res.status(403).json({
        success: false,
        error: "Invalid token type"
      });
    }

    // Check if email is still available (not registered since token was issued)
    const emailExists = await registerUseCases.checkEmailAvailability(email);
    if (emailExists) {
      return res.status(409).json({
        success: false,
        error: "Email has already been registered. Please request a new verification email."
      });
    }

    // Return validated data for the frontend form
    return res.status(200).json({
      success: true,
      message: "Token is valid",
      data: {
        email,
        institutionId,
        institutionName
      }
    });
  } catch (error) {
    console.error("[Controller] Error verifying student token:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const verifyAccountSetupToken = async (req, res) => {
  try {
    // Token is already verified by verifyJWT middleware
    // req.user.body contains the actual payload (JWT wraps it in 'body')
    const tokenData = req.user.body;
    const { email, userId, type } = tokenData;

    // Validate token type is for account setup
    const validTypes = ['admin-account-setup', 'professor-account-setup'];
    if (!validTypes.includes(type)) {
      return res.status(403).json({
        success: false,
        error: "Invalid token type for account setup"
      });
    }

    // Verify user and get their details
    const userData = await registerUseCases.verifyAccountSetupToken(userId, email);

    // Return validated data for the frontend form
    return res.status(200).json({
      success: true,
      message: "Token is valid",
      data: userData
    });
  } catch (error) {
    console.error("[Controller] Error verifying account setup token:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const finalizeStudentRegistration = async (req, res) => {
  try {
    // Token is already verified by verifyJWT middleware
    // req.user.body contains the actual payload (JWT wraps it in 'body')
    const { email, institutionId, type } = req.user.body;
    const { firstNames, lastNames, password, department } = req.body;
    console.log("body: ", req.body)

    console.log("[Controller] Finalize student registration data:");
    console.log("  - Email from token:", email);
    console.log("  - Institution ID:", institutionId);
    console.log("  - Request body:", { firstNames, lastNames, password: password ? '***' : undefined, department });

    // Validate token type
    if (type !== 'student-registration') {
      return res.status(403).json({
        success: false,
        error: "Invalid token type"
      });
    }

    // Validate required fields
    if (!firstNames || !lastNames || !password) {
      return res.status(400).json({
        success: false,
        error: "First name, last name, and password are required"
      });
    }

    // Create the student user
    const newStudent = await registerUseCases.finalizeStudentRegistration(
      institutionId,
      email,
      firstNames,
      lastNames,
      password,
      department
    );

    return res.status(201).json({
      success: true,
      message: "Student account created successfully",
      data: {
        userId: newStudent._id,
        email: newStudent.email,
        firstNames: newStudent.firstNames,
        lastNames: newStudent.lastNames
      }
    });
  } catch (error) {
    console.error("[Controller] Error finalizing student registration:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const completeAccountSetup = async (req, res) => {
  try {
    // Token is already verified by verifyJWT middleware
    // req.user.body contains the actual payload (JWT wraps it in 'body')
    const { email, userId, type } = req.user.body;
    const { password } = req.body;

    console.log("[Controller] Complete account setup:");
    console.log("  - Email from token:", email);
    console.log("  - User ID:", userId);
    console.log("  - Type:", type);
    console.log("  - Has password:", !!password);

    // Validate token type
    const validTypes = ['admin-account-setup', 'professor-account-setup'];
    if (!validTypes.includes(type)) {
      return res.status(403).json({
        success: false,
        error: "Invalid token type for account setup"
      });
    }

    // Validate password
    if (!password) {
      return res.status(400).json({
        success: false,
        error: "Password is required"
      });
    }

    // Complete the account setup
    const updatedUser = await registerUseCases.completeAccountSetup(userId, email, password);

    return res.status(200).json({
      success: true,
      message: "Account setup completed successfully. You can now log in.",
      data: {
        userId: updatedUser._id,
        email: updatedUser.email,
        firstNames: updatedUser.firstNames,
        lastNames: updatedUser.lastNames,
        role: updatedUser.role
      }
    });
  } catch (error) {
    console.error("[Controller] Error completing account setup:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const registerControllers = {
  getAllInstitutions,
  createProfessorRequest,
  createStudentRequest,
  verifyStudentToken,
  verifyAccountSetupToken,
  finalizeStudentRegistration,
  completeAccountSetup,
  createInstitutionRequest
};

export default registerControllers;
