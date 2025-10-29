import registerUseCases from "../use-cases/register.use-cases.js"

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
    createProfessorRequest
}

export default registerControllers