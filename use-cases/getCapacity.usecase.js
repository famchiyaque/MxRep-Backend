const getWareHouseOrderService = require ("../services/wareHouseOrder.service")
const capacityOcupatedsService = require ("../services/capacityOcupated.service")

exports.getCapacity = async (robloxData) => {
    const customerOrder = robloxData.customerOrder
    const quality = robloxData.quality
    const anualCapacity = robloxData.anualCapacity

    const wareHouseOrder = await getWareHouseOrderService.getWareHouseOrder(customerOrder, quality)
    const capacityOcupateds = await capacityOcupatedsService.getCapacityOcupated(wareHouseOrder, anualCapacity)
    console.log('customerOrder: ',robloxData.customerOrder)
    console.log('quality: ',robloxData.quality)
    console.log('anualCapacity: ',robloxData.anualCapacity)
    console.log('wareHouseOrder: ',wareHouseOrder)
    console.log('capacityOcupateds: %',capacityOcupateds)
}
