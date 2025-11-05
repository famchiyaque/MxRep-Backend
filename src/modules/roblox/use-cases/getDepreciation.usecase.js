import DepreciationService from '../services/getDepreciation.service.js'
import productionLineIdTemplateModel from '../../../shared/models/productionLineTemplate.model.js'

const getDepreciation = async (robloxData) => {
    const productionLineIdTemplate = robloxData.roblox.processesInProductionLine.productionLineId;
    console.log('Use Case: Buscando plantilla con ID:', productionLineIdTemplate);

    const productionLineTemplate = await productionLineIdTemplateModel.findByIdProductionLineTemplate(productionLineIdTemplate);

    if (!productionLineTemplate) {
        console.log(`Use Case: No se encontró la plantilla con ID: ${productionLineIdTemplate}`);
        return null;
    }

    const componentsProductionLine = await productionLineTemplate.components;

    console.log("Components_Use-Case:",componentsProductionLine);

    const depreciation = await DepreciationService.getDepreciation(componentsProductionLine);

    console.log("Depreciation calculated:", depreciation);

};

const getDepreciationUseCase = {
    getDepreciation
}

export default getDepreciationUseCase