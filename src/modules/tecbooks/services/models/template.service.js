import bomModel from "#src/shared/models/games/templates/bom.model.js";
import employeeTemplateModel from "#src/shared/models/games/templates/employee.model.js";
import assetTemplateModel from "#src/shared/models/games/templates/asset.model.js";
import materialModel from "#src/shared/models/games/templates/material.model.js";
import processModel from "#src/shared/models/games/templates/process.model.js";
import expenseTemplateModel from "#src/shared/models/games/templates/expense.model.js";
import jobModel from "#src/shared/models/games/templates/job.model.js";
import skillModel from "#src/shared/models/games/templates/skill.model.js";
import { DatabaseError, NotFoundError } from "#src/utils/errors/AppError.js";

// Helper to build scope query
const buildScopeQuery = (institutionId, professorId, includeSystem = true) => {
  const scopeConditions = [];
  
  if (includeSystem) {
    scopeConditions.push({ scope: "system" });
  }
  
  if (institutionId) {
    scopeConditions.push({ 
      institutionId, 
      scope: "institution" 
    });
  }
  
  if (professorId) {
    scopeConditions.push({ 
      professorId, 
      scope: "professor" 
    });
  }
  
  return scopeConditions.length > 0 ? { $or: scopeConditions } : {};
};

// BOM Templates
const getBOMs = async (institutionId, professorId) => {
  try {
    const query = buildScopeQuery(institutionId, professorId);
    const boms = await bomModel.BOM.find(query)
      .populate('requiredMaterials.material', 'name unitCost')
      .populate('processes', 'name durationMinutes')
      .sort({ createdAt: -1 });
    return boms;
  } catch (err) {
    console.error("[Service] Error getting BOMs:", err);
    throw new DatabaseError(`Failed to get BOMs: ${err.message}`, err);
  }
};

const createBOM = async (bomData) => {
  try {
    const newBOM = await bomModel.BOM.create(bomData);
    return newBOM;
  } catch (err) {
    console.error("[Service] Error creating BOM:", err);
    throw new DatabaseError(`Failed to create BOM: ${err.message}`, err);
  }
};

// Employee Templates
const getEmployeeTemplates = async (institutionId, professorId) => {
  try {
    const query = buildScopeQuery(institutionId, professorId);
    const employees = await employeeTemplateModel.EmployeeTemplate.find(query)
      .populate('jobId', 'name jobTitle baseSalary')
      .populate('skills', 'name description')
      .sort({ createdAt: -1 });
    return employees;
  } catch (err) {
    console.error("[Service] Error getting employee templates:", err);
    throw new DatabaseError(`Failed to get employee templates: ${err.message}`, err);
  }
};

const createEmployeeTemplate = async (employeeData) => {
  try {
    const newEmployee = await employeeTemplateModel.EmployeeTemplate.create(employeeData);
    return newEmployee;
  } catch (err) {
    console.error("[Service] Error creating employee template:", err);
    throw new DatabaseError(`Failed to create employee template: ${err.message}`, err);
  }
};

// Asset Templates
const getAssetTemplates = async (institutionId, professorId) => {
  try {
    const query = buildScopeQuery(institutionId, professorId);
    const assets = await assetTemplateModel.AssetTemplate.find(query)
      .sort({ createdAt: -1 });
    return assets;
  } catch (err) {
    console.error("[Service] Error getting asset templates:", err);
    throw new DatabaseError(`Failed to get asset templates: ${err.message}`, err);
  }
};

const createAssetTemplate = async (assetData) => {
  try {
    const newAsset = await assetTemplateModel.AssetTemplate.create(assetData);
    return newAsset;
  } catch (err) {
    console.error("[Service] Error creating asset template:", err);
    throw new DatabaseError(`Failed to create asset template: ${err.message}`, err);
  }
};

// Materials
const getMaterials = async (institutionId, professorId) => {
  try {
    const query = buildScopeQuery(institutionId, professorId);
    const materials = await materialModel.Material.find(query)
      .sort({ createdAt: -1 });
    return materials;
  } catch (err) {
    console.error("[Service] Error getting materials:", err);
    throw new DatabaseError(`Failed to get materials: ${err.message}`, err);
  }
};

const createMaterial = async (materialData) => {
  try {
    const newMaterial = await materialModel.Material.create(materialData);
    return newMaterial;
  } catch (err) {
    console.error("[Service] Error creating material:", err);
    throw new DatabaseError(`Failed to create material: ${err.message}`, err);
  }
};

// Processes
const getProcesses = async (institutionId, professorId) => {
  try {
    const query = buildScopeQuery(institutionId, professorId);
    const processes = await processModel.Process.find(query)
      .populate('requiredAssets', 'name type')
      .populate('requiredJobs.job', 'name jobTitle')
      .sort({ createdAt: -1 });
    return processes;
  } catch (err) {
    console.error("[Service] Error getting processes:", err);
    throw new DatabaseError(`Failed to get processes: ${err.message}`, err);
  }
};

const createProcess = async (processData) => {
  try {
    const newProcess = await processModel.Process.create(processData);
    return newProcess;
  } catch (err) {
    console.error("[Service] Error creating process:", err);
    throw new DatabaseError(`Failed to create process: ${err.message}`, err);
  }
};

// Expense Templates
const getExpenseTemplates = async (institutionId, professorId) => {
  try {
    const query = buildScopeQuery(institutionId, professorId);
    const expenses = await expenseTemplateModel.ExpenseTemplate.find(query)
      .sort({ createdAt: -1 });
    return expenses;
  } catch (err) {
    console.error("[Service] Error getting expense templates:", err);
    throw new DatabaseError(`Failed to get expense templates: ${err.message}`, err);
  }
};

const createExpenseTemplate = async (expenseData) => {
  try {
    const newExpense = await expenseTemplateModel.ExpenseTemplate.create(expenseData);
    return newExpense;
  } catch (err) {
    console.error("[Service] Error creating expense template:", err);
    throw new DatabaseError(`Failed to create expense template: ${err.message}`, err);
  }
};

// Jobs
const getJobs = async (institutionId, professorId) => {
  try {
    const query = buildScopeQuery(institutionId, professorId);
    const jobs = await jobModel.Job.find(query)
      .populate('skillsNeeded', 'name description')
      .sort({ createdAt: -1 });
    return jobs;
  } catch (err) {
    console.error("[Service] Error getting jobs:", err);
    throw new DatabaseError(`Failed to get jobs: ${err.message}`, err);
  }
};

const createJob = async (jobData) => {
  try {
    const newJob = await jobModel.Job.create(jobData);
    return newJob;
  } catch (err) {
    console.error("[Service] Error creating job:", err);
    throw new DatabaseError(`Failed to create job: ${err.message}`, err);
  }
};

// Skills
const getSkills = async (institutionId, professorId) => {
  try {
    const query = buildScopeQuery(institutionId, professorId);
    const skills = await skillModel.Skill.find(query)
      .sort({ createdAt: -1 });
    return skills;
  } catch (err) {
    console.error("[Service] Error getting skills:", err);
    throw new DatabaseError(`Failed to get skills: ${err.message}`, err);
  }
};

const createSkill = async (skillData) => {
  try {
    const newSkill = await skillModel.Skill.create(skillData);
    return newSkill;
  } catch (err) {
    console.error("[Service] Error creating skill:", err);
    throw new DatabaseError(`Failed to create skill: ${err.message}`, err);
  }
};

const templateService = {
  getBOMs,
  createBOM,
  getEmployeeTemplates,
  createEmployeeTemplate,
  getAssetTemplates,
  createAssetTemplate,
  getMaterials,
  createMaterial,
  getProcesses,
  createProcess,
  getExpenseTemplates,
  createExpenseTemplate,
  getJobs,
  createJob,
  getSkills,
  createSkill,
};

export default templateService;

