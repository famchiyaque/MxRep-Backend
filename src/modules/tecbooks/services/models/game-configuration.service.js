import gameConfigurationModel from "#src/shared/models/games/game-configuration.model.js";
import { DatabaseError, NotFoundError } from "#src/utils/errors/AppError.js";

const createGameConfiguration = async (configData) => {
  try {
    const newConfig = await gameConfigurationModel.GameConfiguration.create(configData);
    return newConfig;
  } catch (err) {
    console.error("[Service] Error creating game configuration:", err);
    throw new DatabaseError(`Failed to create game configuration: ${err.message}`, err);
  }
};

const getGameConfigurationById = async (configId) => {
  try {
    const config = await gameConfigurationModel.GameConfiguration.findById(configId)
      .populate('premisesConfigId')
      .populate('ordersConfigId')
      .populate('availableAssetIds')
      .populate('availableEmployeeIds')
      .populate('availableBOMIds')
      .populate('availableExpenseIds')
      .populate('availableMaterialIds')
      .populate('availableProcessIds');
    
    if (!config) {
      throw new NotFoundError(`Game configuration with id ${configId} not found`);
    }

    return config;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error getting game configuration by id:", err);
    throw new DatabaseError(`Failed to get game configuration: ${err.message}`, err);
  }
};

const getAllGameConfigurations = async () => {
  try {
    const configs = await gameConfigurationModel.GameConfiguration.find()
      .select('name description initialCapital gameDurationMonths')
      .sort({ createdAt: -1 });

    return configs;
  } catch (err) {
    console.error("[Service] Error getting all game configurations:", err);
    throw new DatabaseError(`Failed to get game configurations: ${err.message}`, err);
  }
};

const updateGameConfiguration = async (configId, updates) => {
  try {
    const updatedConfig = await gameConfigurationModel.GameConfiguration.findByIdAndUpdate(
      configId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedConfig) {
      throw new NotFoundError(`Game configuration with id ${configId} not found`);
    }

    return updatedConfig;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error updating game configuration:", err);
    throw new DatabaseError(`Failed to update game configuration: ${err.message}`, err);
  }
};

const deleteGameConfiguration = async (configId) => {
  try {
    const deletedConfig = await gameConfigurationModel.GameConfiguration.findByIdAndDelete(configId);

    if (!deletedConfig) {
      throw new NotFoundError(`Game configuration with id ${configId} not found`);
    }

    return deletedConfig;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error deleting game configuration:", err);
    throw new DatabaseError(`Failed to delete game configuration: ${err.message}`, err);
  }
};

const gameConfigurationService = {
  createGameConfiguration,
  getGameConfigurationById,
  getAllGameConfigurations,
  updateGameConfiguration,
  deleteGameConfiguration,
};

export default gameConfigurationService;

