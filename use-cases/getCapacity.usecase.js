const getWareHouseOrderService = require ("../services/wareHouseOrder.service")
const capacityOcupatedsService = require ("../services/capacityOcupated.service")

exports.getCapacity = async (robloxData) => {
    const customOrder = robloxData.customOrder
    const quality = robloxData.productionLine.quality
    const anualCapacity = robloxData.anualCapacity
    const wareHouseOrder = getWareHouseOrderService.getWareHouseOrder(customOrder, quality)
    const capacityOcupateds = capacityOcupatedsService.capacityOcupateds(wareHouseOrder, anualCapacity)
    console.log(wareHouseOrder)
    console.log(capacityOcupateds)
}