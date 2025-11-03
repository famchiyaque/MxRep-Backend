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
  try {
    const { email, institutionName, firstNames, lastNames, department } = req.body

    await registerUseCases.createProfessorRequest(
      institutionName,
      email,
      firstNames,
      lastNames,
      department
    )

    return res.json(200).json({ success: true, message: "Professor request created successfully" })
  } catch (error) {
    const status = err.statusCode || 500
    const message = err.userMessage || "Internal server error"

    return res.status(status).json({ error: message })
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
    console.log("Body: ", req.body)
    const { name, slug, domain } = institution

    const result = await registerUseCases.createInstitutionRequest(
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

    if (!result.success) {
      return res.status(409).json({ success: false, error: result.message });
    }

    console.log("Success creating instution request, returning success message")
    return res.status(200).json({ success: true, message: "Institution request made successfully" })
  } catch (error) {
    console.log("Error in register institution controller: ", error)
    const status = error.statusCode || 500
    const message = error.userMessage || "Internal server error"

    return res.status(status).json({ error: message })
  }
}

const registerControllers = {
  getAllInstitutions,
  createProfessorRequest,
  createInstitutionRequest
};

export default registerControllers;
