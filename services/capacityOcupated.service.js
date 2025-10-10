
exports.getCapacityOcupated = async (wareHouseOrder, annualCapacity) => {
    return wareHouseOrder / annualCapacity * 100
}