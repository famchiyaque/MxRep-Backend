
const getWareHouseOrder = async (customerOrder, quality) => {
    return customerOrder / quality
}

const getWareHouseOrderService = {
    getWareHouseOrder
}

export default getWareHouseOrderService