const getCapacityUseCase = require("../use-cases/getCapacity.usecase")

exports.generateData = async (request, response) => {
    const robloxData = {
        customerOrder: 16000,    
        anualCapacity: 30857,
        quality: 0.8
    };

    await getCapacityUseCase.getCapacity(robloxData)
    response.json({ success: true, data: robloxData })
}
