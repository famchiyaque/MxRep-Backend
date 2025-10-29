const getDepreciation1 = async (componentsProductionLine) => {
    let totalDepreciation = 0;

    let machinaryDepreciation = 0;

    let buildingDepreciation = 0;

    let transportDepreciation = 0;

    let computerDepreciation = 0;

    let num = 0;

    for (component in componentsProductionLine){
        console.log(num);
        if (componentsProductionLine.components == "porcentajeDepreciacionEdificios"){
            buildingDepreciation += componentsProductionLine.value;
            console.log("Si");
        }
        num = num + 1 ;
    }

    console.log("Building: " ,buildingDepreciation);
};

const getDepreciationService = {
    getDepreciation1
}

export default getDepreciationService