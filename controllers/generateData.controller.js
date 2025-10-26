const getCapacityUseCase = require("../use-cases/getCapacity.usecase")
const getCycleTime = require('../services/getCycleTime.service')
const getBomUseCase = require('../use-cases/getBom.usecase.js');

exports.generateData = async (request, response) => {
    const robloxData = {
        customerOrder: 16000,    
        anualCapacity: 30857,
        quality: 0.8,
        processesInProductionLine: [
        {
            description: "Estampacion placa 1",
            totalTime: 60,        
            numberOperators: 6
        },
        {
            description: "Ensamble base",
            totalTime: 12,
            numberOperators: 1
        },
        {
            description: "Ensamble 2",
            totalTime: 12,
            numberOperators: 1
        },
        {
            description: "Ensamble 3",
            totalTime: 12,
            numberOperators: 1
        },
        {
            description: "Ensamble 4",
            totalTime: 12,
            numberOperators: 1
        },
        {
            description: "Ensamble 5",
            totalTime: 12,
            numberOperators: 1
        },
        {
            description: "Ensamble 6",
            totalTime: 12,
            numberOperators: 1
        },
        {
            description: "Ensamble 7",
            totalTime: 12,
            numberOperators: 1
        },
        {
            description: "Ensamble 8",
            totalTime: 12,
            numberOperators: 1
        },
        {
            description: "Ensamble 9",
            totalTime: 12,
            numberOperators: 1
        },
        {
            description: "Ensamble 10",
            totalTime: 12,
            numberOperators: 1
        },
        {
            description: "Ensamble 11",
            totalTime: 12,
            numberOperators: 1
        },
        {
            description: "Ensamble 12",
            totalTime: 12,
            numberOperators: 1
        },
        {
            description: "Ensamble 13",
            totalTime: 12,
            numberOperators: 1
        },
        {
            description: "Ensamble 14",
            totalTime: 12,
            numberOperators: 1
        },
        {
            description: "Ensamble 15",
            totalTime: 120,
            numberOperators: 3
        }
    ],
    roblox: {
          processesInProductionLine: {
            bom: {
              bomId: "BOM001"
            }
          }
        }
    };

    await getCapacityUseCase.getCapacity(robloxData)



    try {
        const bomCompleto = await getBomUseCase.getBom(robloxData);
        console.log("✅ ¡BOM encontrado...!");

    } catch (error) {
        console.error("❌ Controller: Ha ocurrido un error en el proceso.", error);
    }

    response.json({ success: true, data: robloxData })
}
