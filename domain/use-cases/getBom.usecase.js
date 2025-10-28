const bomRepository = require("../../infrastructure/repositories/bom.repository.js");

exports.getBom = async (robloxData) => {
    const bomId = robloxData.roblox.processesInProductionLine.bom.bomId;
    console.log('bomId: ', bomId);


    const bom = await bomRepository.getBom(bomId);
    if (!bom) {
        console.log("Use Case: No se encontró el BOM.");
        return null;
    }

    console.log("Use Case: BOM encontrado:", bom);
    const subTotalBom = bom.subtotal;
    console.log('Subtotal del BOM:', subTotalBom);
  
};
