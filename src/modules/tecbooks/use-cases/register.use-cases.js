import registerServices from "../services/register.service.js"

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
  professorCreatesRequest
}

export default registerUseCases