import registerUseCases from "../use-cases/register.use-cases.js";
import sendemailService from "../services/emails/email.service.js"
import generateJWT from "../services/jwt/jwt.js"

const getAllInstitutions = async (req, res) => {
  try {
    const institutions = await registerUseCases.getAllInstitutions()
    return res.status(200).json(institutions);
  } catch (err) {
    console.error("[Controller Error] getAllInstitutions:", err.message);
    
    // Optionally check for known error types
    const status = err.statusCode || 500;
    const message = err.userMessage || "Internal server error";

    return res.status(status).json({ error: message });
  }
}

const createProfessorRequest = async (req, res) => {
  const { email, institution, firstNames, lastNames, department } = req.body;
  const institutionId = institution.id;
  const institutionName = institution.name;
  const professorRequest = await registerUseCases.professorCreatesRequest(
    email,
    institutionId,
    firstNames,
    lastNames,
    department,
    institutionName
  );

  if (professorRequest.success) {
    return res.status(200).json(professorRequest.data);
  } else {
    return res.status(400).json(professorRequest.error);
  }
};

const createStudentRequest = async (req, res) => {
  try{
    const {email} = req.body;

    const institution = await registerUseCases.studentCreateRequest(email);

    // 1.- generate token with institution and email

    const tokenBody = {institution, email}

    const token = generateJWT(tokenBody, "30 minutes")

    // 2.- send email service with token link

    await sendemailService.sendMail(email,token);
    
    return res.status(200).json({ 
      message: "Register successful",
    });

  }catch(error){
    console.error("Error en createStudentRequest:", error.message); 
    
    return res.status(400).json({ message: error.message });
  }
};

const registerControllers = {
  getAllInstitutions,
  createProfessorRequest,
  createStudentRequest,
};

export default registerControllers;
