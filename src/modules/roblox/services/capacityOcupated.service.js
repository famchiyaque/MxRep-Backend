
const getCapacityOcupated = async (wareHouseOrder, annualCapacity) => {
    return wareHouseOrder / annualCapacity * 100
}

const getCapacityOcupatedService = {
    getCapacityOcupated
}

export default getCapacityOcupatedService