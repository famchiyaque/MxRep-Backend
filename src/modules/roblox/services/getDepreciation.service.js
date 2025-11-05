const getDepreciation = async (componentsProductionLine) => {
    let totalDepreciation = 0;

    let machinaryDepreciation = 0;

    let buildingDepreciation = 0;

    let transportDepreciation = 0;

    let computerDepreciation = 0;

    let num = 0;

    for (const component of componentsProductionLine) {
        
        totalDepreciation += component.value;

        if (component.type === "machinery") {
            machinaryDepreciation += component.value; 

        } else if (component.type === "building") {
            buildingDepreciation += component.value; 

        } else if (component.type === "transport") {
            transportDepreciation += component.value;

        } else if (component.type === "computer") {
            computerDepreciation += component.value;
        }
    }

    const depreciationData = {
        totalDepreciation,
        machinaryDepreciation,
        buildingDepreciation,
        transportDepreciation,
        computerDepreciation,
    };

    return depreciationData;
};

const getDepreciationService = {
   getDepreciation,
}

export default getDepreciationService