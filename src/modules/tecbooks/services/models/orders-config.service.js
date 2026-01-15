import ordersConfigModel from "#src/shared/models/games/config/orders-config.model.js";
import { DatabaseError, NotFoundError } from "#src/utils/errors/AppError.js";

const createOrdersConfig = async (ordersConfigData) => {
  try {
    const newConfig = await ordersConfigModel.OrdersConfig.create(ordersConfigData);
    return newConfig;
  } catch (err) {
    console.error("[Service] Error creating orders config:", err);
    throw new DatabaseError(`Failed to create orders config: ${err.message}`, err);
  }
};

const getOrdersConfigById = async (configId) => {
  try {
    const config = await ordersConfigModel.OrdersConfig.findById(configId);
    
    if (!config) {
      throw new NotFoundError(`Orders config with id ${configId} not found`);
    }

    return config;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error getting orders config by id:", err);
    throw new DatabaseError(`Failed to get orders config: ${err.message}`, err);
  }
};

const getDefaultOrdersConfig = () => {
  // Return default values (same as schema defaults)
  return {
    ordersPerYear: 100000,
    ordersByMonth: {
      january: 0.08,
      february: 0.09,
      march: 0.09,
      april: 0.08,
      may: 0.08,
      june: 0.08,
      july: 0.08,
      august: 0.09,
      september: 0.09,
      october: 0.08,
      november: 0.08,
      december: 0.08,
    }
  };
};

const ordersConfigService = {
  createOrdersConfig,
  getOrdersConfigById,
  getDefaultOrdersConfig,
};

export default ordersConfigService;

