const productionLine = require('../../infrastructure/repositories/productionLineTemplate.repository.js');
const DepreciationService = require('../services/getDepreciation.service.js');

exports.getDepreciation = async (robloxData) => {
    const productionLineIdTemplate = robloxData.roblox.processesInProductionLine.productionLineId;
    console.log('Use Case: Buscando plantilla con ID:', productionLineIdTemplate);

    const productionLineTemplate = await productionLine.getProductionLineTemplateById(productionLineIdTemplate);
    if (!productionLineTemplate) {
        console.log("Use Case: No se encontró la plantilla de línea de producción.");
        return null;
    }

    const componentsProductionLine = await productionLineTemplate.politicas;

    console.log(componentsProductionLine);



    const depreciationData = await DepreciationService.getDepreciation1(componentsProductionLine);

    console.log("Depreciation:" );

    return true;
};
