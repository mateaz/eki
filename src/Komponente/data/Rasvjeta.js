import * as rasvjeta from "../../data/rasvjeta/rasvjeta.json";

export const rasvjeta1 = rasvjeta.features.filter(data => data.properties.Tip === 1).map((data) => {
    return data;
});

export const rasvjeta2 = rasvjeta.features.filter(data => data.properties.Tip === 2).map((data) => {
    return data;
});

export const rasvjeta3 = rasvjeta.features.filter(data => data.properties.Tip === 3).map((data) => {
    return data;
});

export const rasvjeta4 = rasvjeta.features.filter(data => data.properties.Tip === 4).map((data) => {
    return data;
});

export const rasvjeta5 = rasvjeta.features.filter(data => data.properties.Tip === 5).map((data) => {
    return data;
});
  
export const rasvjeta6 = rasvjeta.features.filter(data => data.properties.Tip === 6).map((data) => {
    return data;
});
  
export const rasvjeta7 = rasvjeta.features.filter(data => data.properties.Tip === 7).map((data) => {
    return data;
});