import DepreciationService from '../services/getDepreciation.service.js'
import productionLineIdTemplateModel from '#src/shared/models/productionLineTemplate.model.js';

const getDepreciation = async (robloxData) => {
    const productionLineIdTemplate = robloxData.roblox.processesInProductionLine.productionLineId;
    console.log('Use Case: Buscando plantilla con ID:', productionLineIdTemplate);

    const productionLineTemplate = await productionLineTemplateModel.findByIdProductionLineTemplate(productionLineIdTemplate);
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

const getDepreciationUseCase = {
    getDepreciation
}

export default getDepreciationUseCase