// import * as tf from "@tensorflow/tfjs";
// import * as tfvis from "@tensorflow/tfjs-vis";

/**
 * Get the car data reduced to just the variables we are interested
 * and cleaned of missing data.
 */
export async function getDataFromTenserflow() {
    const carsDataResponse = await fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json');
    const carsData = await carsDataResponse.json();
    const cleaned = carsData.map((car: any) => ({
        mpg: car.Miles_per_Gallon,
        horsepower: car.Horsepower,
    }))
        .filter((car: any) => (car.mpg != null && car.horsepower != null));

    return cleaned;
}


export async function LogisticRegressionAlgorithmDemo() {
    // Load and plot the original input data that we are going to train on.
    const data = await getDataFromTenserflow();
    const values = data.map((d: any) => ({
        x: d.horsepower,
        y: d.mpg,
    }));

    // tfvis.render.scatterplot(
    //     { name: 'Horsepower v MPG' },
    //     { values },
    //     {
    //         xLabel: 'Horsepower',
    //         yLabel: 'MPG',
    //         height: 300
    //     }
    // );

    // More code will be added below
}