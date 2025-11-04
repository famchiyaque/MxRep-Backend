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
    const { email, institutionName, firstNames, lastNames, department } = req.body

    await registerUseCases.createProfessorRequest(
      institutionName,
      email,
      firstNames,
      lastNames,
      department
    )

    return res.status(201).json({ 
      success: true, 
      message: "Professor request created successfully" 
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
    // req.user contains the decoded token payload
    const { email, institutionId, institutionName, type } = req.user;

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

const finalizeStudentRegistration = async (req, res) => {
  try {
    // Token is already verified by verifyJWT middleware
    const { email, institutionId, type } = req.user;
    const { firstNames, lastNames, password, department } = req.body;

    // Validate token type
    if (type !== 'student-registration') {
      return res.status(403).json({
        success: false,
        error: "Invalid token type"
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

const registerControllers = {
  getAllInstitutions,
  createProfessorRequest,
  createStudentRequest,
  verifyStudentToken,
  finalizeStudentRegistration,
  createInstitutionRequest
};

export default registerControllers;
