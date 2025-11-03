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

const studentCreateRequest = async(email) =>{

  const studentRequest = await registerServices.studentRequestService(email);

  console.log("studentRequest:", studentRequest);

  // Verificar si existe la institucion
  
  // if( !studentRequest.success ){
    // console.log("No se encontro institucion para el email:", email);
    // throw new Error(studentRequest.message);
  // }

  return studentRequest;
};


const registerUseCases = {
  getAllInstitutions,
  professorCreatesRequest,
  studentCreateRequest,
}

export default registerUseCases