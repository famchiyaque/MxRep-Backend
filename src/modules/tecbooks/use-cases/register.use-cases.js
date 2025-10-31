import registerServices from "../services/register.service.js"

const getAllInstitutions = async () => {
  try {
    const institutions = await registerServices.getAllInstitutions()

    return institutions
  } catch (err) {
    throw new Error(`[UseCase] Failed to fetch institutions: ${err.message}`);
  }
}

const professorCreatesRequest = async (
  email,
  institutionId,
  firstNames,
  lastNames,
  department,
  institutionName
) => {
  console.log("createProfessorRequest");
  const professorRequest = await registerServices.professorRequestService(
    email,
    institutionId,
    firstNames,
    lastNames,
    department,
    institutionName
  );

  return professorRequest;
};


const registerUseCases = {
  getAllInstitutions,
  professorCreatesRequest
}

export default registerUseCases