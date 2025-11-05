import classModel from "#src/shared/models/groups/class.model.js";
import { DatabaseError, NotFoundError } from "#src/utils/errors/AppError.js";

const createClass = async (institutionId, professorId, name, description, code) => {
  try {
    const newClass = await classModel.Class.create({
      institutionId,
      professorId,
      name,
      description,
      code
    });

    return newClass;
  } catch (err) {
    console.error("[Service] Error creating class:", err);
    
    if (err.code === 11000) {
      throw new DatabaseError("A class with this name already exists", err);
    }
    
    throw new DatabaseError(`Failed to create class: ${err.message}`, err);
  }
};

const getClassById = async (classId) => {
  try {
    const classDoc = await classModel.Class.findById(classId)
      .populate('institutionId', 'name')
      .populate('professorId', 'firstNames lastNames email');
    
    if (!classDoc) {
      throw new NotFoundError(`Class with id ${classId} not found`);
    }

    return classDoc;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error getting class by id:", err);
    throw new DatabaseError(`Failed to get class: ${err.message}`, err);
  }
};

const getClassesByProfessor = async (professorId) => {
  try {
    const classes = await classModel.Class.find({ professorId })
      // .populate('institutionId', 'name')
      .sort({ createdAt: -1 });

    return classes;
  } catch (err) {
    console.error("[Service] Error getting classes by professor:", err);
    throw new DatabaseError(`Failed to get classes: ${err.message}`, err);
  }
};

const updateClass = async (classId, updates) => {
  try {
    const updatedClass = await classModel.Class.findByIdAndUpdate(
      classId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedClass) {
      throw new NotFoundError(`Class with id ${classId} not found`);
    }

    return updatedClass;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error updating class:", err);
    throw new DatabaseError(`Failed to update class: ${err.message}`, err);
  }
};

const deleteClass = async (classId) => {
  try {
    const deletedClass = await classModel.Class.findByIdAndDelete(classId);

    if (!deletedClass) {
      throw new NotFoundError(`Class with id ${classId} not found`);
    }

    return deletedClass;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error deleting class:", err);
    throw new DatabaseError(`Failed to delete class: ${err.message}`, err);
  }
};

const classService = {
  createClass,
  getClassById,
  getClassesByProfessor,
  updateClass,
  deleteClass,
};

export default classService;

