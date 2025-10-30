export const ConversionTable = {
	Peso: {
		Kilogramo: 0.001,
		Gramo: 1,
		Miligramo: 1000,
		Onza: 0.035274,
		Libra: 0.00220462,
	},
	Temperatura: {
		Centigrados: 1,
		Kelvin: 1,
		Fahrenheit: 1,
	},
	Longitud: {
		Milímetro: 1000,
		Centímetro: 100,
		Metro: 1,
		Kilómetro: 0.001,
		Pulgada: 39.3701,
		Pie: 3.2808,
		Yarda: 1.0936,
		Milla: 0.00062137,
	},
} as const

export const Unidades = Object.fromEntries(
	Object.entries(ConversionTable).map(([key, value]) => [
		key,
		Object.keys(value),
	])
) as {
	[K in keyof typeof ConversionTable]: (keyof (typeof ConversionTable)[K])[]
}
