import premisesConfigModel from "#src/shared/models/games/config/premises-config.model.js";
import { DatabaseError, NotFoundError } from "#src/utils/errors/AppError.js";

const createPremisesConfig = async (premisesConfigData) => {
  try {
    const newConfig = await premisesConfigModel.PremisesConfig.create(premisesConfigData);
    return newConfig;
  } catch (err) {
    console.error("[Service] Error creating premises config:", err);
    throw new DatabaseError(`Failed to create premises config: ${err.message}`, err);
  }
};

const getPremisesConfigById = async (configId) => {
  try {
    const config = await premisesConfigModel.PremisesConfig.findById(configId);
    
    if (!config) {
      throw new NotFoundError(`Premises config with id ${configId} not found`);
    }

    return config;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error getting premises config by id:", err);
    throw new DatabaseError(`Failed to get premises config: ${err.message}`, err);
  }
};

const getDefaultPremisesConfig = () => {
  // Return default values (same as schema defaults)
  return {
    year: new Date().getFullYear(),
    economics: {
      closingExchangeRate: 16.66,
      nationalPrimeRate: 0.16,
      cpp: 0.28,
      treasuryBills: 0.332,
      libor: 0.077,
    },
    tax: {
      nationalInflation: 0.043,
      incomeTaxRate: 0.34,
      corporateTaxRate: 1.8,
      employeeProfitSharingRate: 0.1,
      foreignInflation: null,
    },
    policies: {
      inventoryPercentage: 0.2,
      suppliersPercentage: 0.2,
      shortTermLiabilityPercentage: 0.03,
      directProductCostPercentage: 0.15,
      indirectProductCostPercentage: 0.05,
      salesExpensePercentage: 0.002,
      administrationPercentage: 0.005,
      buildingDepreciationRate: 0.05,
      machineryAndEquipmentDepreciationRate: 0.1,
      transportEquipmentDepreciationRate: 0.2,
      computerEquipmentDepreciationRate: 0.085,
    }
  };
};

const premisesConfigService = {
  createPremisesConfig,
  getPremisesConfigById,
  getDefaultPremisesConfig,
};

export default premisesConfigService;

