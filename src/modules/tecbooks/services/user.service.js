import professorModel from "#src/shared/models/professorRequest.model.js"
import userModel from "#src/shared/models/user.model.js";
import { DatabaseError, NotFoundError } from "#src/utils/errors/AppError.js"
import bcrypt from "bcrypt"

const createUser = async (
    institutionId, email, firstNames, lastNames, role, department, isAdmin
  ) => {
    try {
      const user = await userModel.User.create({
        institutionId, email, firstNames, lastNames, role, department,
        isAdmin: role === "admin" || role === "super-admin" || (role === "professor" && isAdmin),
        needsToConfigurePass: true
      })

      return user
    } catch (err) {
      console.error("[Service] Error creating user:", err);
      
      // Handle duplicate key errors (e.g., unique email)
      if (err.code === 11000) {
        const field = Object.keys(err.keyPattern || {})[0] || 'field';
        throw new DatabaseError(`User with this ${field} already exists`, err);
      }
      
      throw new DatabaseError(`Failed to create user: ${err.message}`, err)
    }
};

const checkEmailExists = async (email) => {
  try {
    const user = await userModel.User.findOne({ email });
    return !!user;
  } catch (err) {
    console.error("[Service] Error checking if email exists:", err);
    throw new DatabaseError(`Failed to check email existence: ${err.message}`, err);
  }
};

const hashPassword = async (password) => {
  try {
    // Validate password exists
    if (!password) {
      throw new DatabaseError("Password is required");
    }

    // Use 10 salt rounds (good balance of security and performance)
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err) {
    console.error("[Service] Error hashing password:", err);
    
    // Re-throw if already an AppError
    if (err.statusCode) throw err;
    
    throw new DatabaseError(`Failed to hash password: ${err.message}`, err);
  }
};

const createStudentWithPassword = async (
  institutionId, email, firstNames, lastNames, passwordHash, department
) => {
  try {
    const student = await userModel.User.create({
      institutionId,
      email,
      firstNames,
      lastNames,
      passwordHash,
      role: "student",
      department,
      isAdmin: false,
      needsToConfigurePass: false // Password is already set
    });

    return student;
  } catch (err) {
    console.error("[Service] Error creating student:", err);
    
    // Handle duplicate key errors (e.g., unique email)
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || 'field';
      throw new DatabaseError(`User with this ${field} already exists`, err);
    }
    
    throw new DatabaseError(`Failed to create student: ${err.message}`, err);
  }
};

const getInstitutionAdmins = async (institutionId) => {
  try {
    // Find users who are admins for this institution
    const admins = await userModel.User.find({
      institutionId,
      $or: [
        { role: "admin" },
        { isAdmin: true }
      ]
    }).select('email firstNames lastNames role');

    return admins;
  } catch (err) {
    console.error("[Service] Error getting institution admins:", err);
    throw new DatabaseError(`Failed to get institution admins: ${err.message}`, err);
  }
};

// const finalizeUser = async (

// )

const getUserById = async (userId) => {
  try {
    const user = await userModel.User.findById(userId);
    
    if (!user) {
      throw new NotFoundError(`User with id ${userId} not found`);
    }

    return user;
  } catch (err) {
    if (err.statusCode) throw err; // Re-throw if already an AppError
    
    console.error("[Service] Error getting user by id:", err);
    throw new DatabaseError(`Failed to get user: ${err.message}`, err);
  }
};

const completeUserSetup = async (userId, passwordHash) => {
  try {
    const updatedUser = await userModel.User.findByIdAndUpdate(
      userId,
      { 
        $set: { 
          passwordHash,
          needsToConfigurePass: false 
        } 
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new NotFoundError(`User with id ${userId} not found`);
    }

    return updatedUser;
  } catch (err) {
    if (err.statusCode) throw err; // Re-throw if already an AppError
    
    console.error("[Service] Error completing user setup:", err);
    throw new DatabaseError(`Failed to complete user setup: ${err.message}`, err);
  }
};

const getUsersByInstitutionAndRole = async (institutionId, role) => {
  try {
    const users = await userModel.User.find({
      institutionId,
      role
    }).select('-passwordHash').sort({ createdAt: -1 });

    return users;
  } catch (err) {
    console.error(`[Service] Error getting ${role}s by institution:`, err);
    throw new DatabaseError(`Failed to get ${role}s: ${err.message}`, err);
  }
};

const userService = {
    createUser,
    checkEmailExists,
    hashPassword,
    createStudentWithPassword,
    getInstitutionAdmins,
    getUserById,
    completeUserSetup,
    getUsersByInstitutionAndRole,
}

export default userService