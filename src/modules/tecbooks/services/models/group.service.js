import groupModel from "#src/shared/models/groups/group.model.js";
import { DatabaseError, NotFoundError } from "#src/utils/errors/AppError.js";

const createGroup = async (classId, professorId, name, description, code) => {
  try {
    const newGroup = await groupModel.Group.create({
      classId,
      professorId,
      name,
      description,
      code,
      members: [],
      status: "active"
    });

    return newGroup;
  } catch (err) {
    console.error("[Service] Error creating group:", err);
    
    if (err.code === 11000) {
      throw new DatabaseError("A group with this name already exists", err);
    }
    
    throw new DatabaseError(`Failed to create group: ${err.message}`, err);
  }
};

const getGroupById = async (groupId) => {
  try {
    const group = await groupModel.Group.findById(groupId)
      .populate('classId', 'name')
      .populate('professorId', 'firstNames lastNames email')
      .populate('members', 'firstNames lastNames email');
    
    if (!group) {
      throw new NotFoundError(`Group with id ${groupId} not found`);
    }

    return group;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error getting group by id:", err);
    throw new DatabaseError(`Failed to get group: ${err.message}`, err);
  }
};

const getGroupsByProfessor = async (professorId) => {
  try {
    const groups = await groupModel.Group.find({ professorId })
      .populate('classId', 'name')
      .populate('members', 'firstNames lastNames email')
      .sort({ createdAt: -1 });

    return groups;
  } catch (err) {
    console.error("[Service] Error getting groups by professor:", err);
    throw new DatabaseError(`Failed to get groups: ${err.message}`, err);
  }
};

const getGroupsByClass = async (classId) => {
  try {
    const groups = await groupModel.Group.find({ classId })
      .populate('professorId', 'firstNames lastNames email')
      .populate('members', 'firstNames lastNames email')
      .sort({ createdAt: -1 });

    return groups;
  } catch (err) {
    console.error("[Service] Error getting groups by class:", err);
    throw new DatabaseError(`Failed to get groups: ${err.message}`, err);
  }
};

const updateGroup = async (groupId, updates) => {
  try {
    const updatedGroup = await groupModel.Group.findByIdAndUpdate(
      groupId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedGroup) {
      throw new NotFoundError(`Group with id ${groupId} not found`);
    }

    return updatedGroup;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error updating group:", err);
    throw new DatabaseError(`Failed to update group: ${err.message}`, err);
  }
};

const addStudentToGroup = async (groupId, studentId) => {
  try {
    const updatedGroup = await groupModel.Group.findByIdAndUpdate(
      groupId,
      { $addToSet: { members: studentId } },
      { new: true, runValidators: true }
    ).populate('members', 'firstNames lastNames email');

    if (!updatedGroup) {
      throw new NotFoundError(`Group with id ${groupId} not found`);
    }

    return updatedGroup;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error adding student to group:", err);
    throw new DatabaseError(`Failed to add student to group: ${err.message}`, err);
  }
};

const removeStudentFromGroup = async (groupId, studentId) => {
  try {
    const updatedGroup = await groupModel.Group.findByIdAndUpdate(
      groupId,
      { $pull: { members: studentId } },
      { new: true, runValidators: true }
    ).populate('members', 'firstNames lastNames email');

    if (!updatedGroup) {
      throw new NotFoundError(`Group with id ${groupId} not found`);
    }

    return updatedGroup;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error removing student from group:", err);
    throw new DatabaseError(`Failed to remove student from group: ${err.message}`, err);
  }
};

const deleteGroup = async (groupId) => {
  try {
    const deletedGroup = await groupModel.Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      throw new NotFoundError(`Group with id ${groupId} not found`);
    }

    return deletedGroup;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error deleting group:", err);
    throw new DatabaseError(`Failed to delete group: ${err.message}`, err);
  }
};

const groupService = {
  createGroup,
  getGroupById,
  getGroupsByProfessor,
  getGroupsByClass,
  updateGroup,
  addStudentToGroup,
  removeStudentFromGroup,
  deleteGroup,
};

export default groupService;

