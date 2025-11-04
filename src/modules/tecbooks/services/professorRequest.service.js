import professorRequestModel from "#src/shared/models/professorRequest.model.js"

const createProfessorRequest = async (
    institutionId,
    email,
    firstNames,
    lastNames,
    department
  ) => {
    try {
      await professorRequestModel.ProfessorRequest.create({
        institutionId,
        email,
        firstNames,
        lastNames,
        department,
      });
    } catch (err) {
      throw new Error(`Error creating professor request in service: , ${err.message}`)
    }
};

const professorRequestService = {
    createProfessorRequest,
}

export default professorRequestService