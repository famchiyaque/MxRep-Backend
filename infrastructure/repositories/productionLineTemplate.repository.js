const productionLineModel = require("../models/productionLineTemplate.model");

exports.getProductionLineTemplateById = async (productionLineIdTemplate) => {
    
    return await productionLineModel.findByIdProductionLineTemplate(productionLineIdTemplate);
};
