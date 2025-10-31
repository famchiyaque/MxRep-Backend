import registerUseCases from "../use-cases/register.use-cases.js";

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

const registerControllers = {
  getAllInstitutions,
  createProfessorRequest,
};

export default registerControllers;
