export const ConversionTable = {
    Peso: {
        Kilogramo: 0.001,
        Gramo: 1,
        Miligramo: 1000,
        Onza: 0.035274,
        Libra: 0.00220462,
    },
    Temperatura: {
        Kelvin: (c) => c + 273.15,
        Celcius: 1,
        Fahrenheit: (c) => c * 1.8 + 32,
    },
    Longitud: {},
};
export const Unidades = Object.fromEntries(Object.entries(ConversionTable).map(([key, value]) => [
    key,
    Object.keys(value)
]));
