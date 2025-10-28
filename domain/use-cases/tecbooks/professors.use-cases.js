const professorRequestService =
  require("../../../domain/services/tecbooks/professors.service").professorRequestService;

exports.createProfessorRequest = async (
  email,
  institutionId,
  firstNames,
  lastNames,
  department,
  institutionName
) => {
  console.log("createProfessorRequest");
  const professorRequest = await professorRequestService(
    email,
    institutionId,
    firstNames,
    lastNames,
    department,
    institutionName
  );

  return professorRequest;
};
