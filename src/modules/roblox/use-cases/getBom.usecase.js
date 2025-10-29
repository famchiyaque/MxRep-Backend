import bomModel from "#src/shared/models/bom.model.js"

const getBom = async (robloxData) => {
    const bomId = robloxData.roblox.processesInProductionLine.bom.bomId;
    console.log('bomId: ', bomId);


    const bom = await bomModel.findByBomId(bomId);
    if (!bom) {
        console.log("Use Case: No se encontró el BOM.");
        return null;
    }

    console.log("Use Case: BOM encontrado:", bom);
    const subTotalBom = bom.subtotal;
    console.log('Subtotal del BOM:', subTotalBom);
};

const getBomUseCase = {
    getBom
}

export default getBomUseCase