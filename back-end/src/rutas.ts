import type { Response, Request, NextFunction } from 'express'
import { ConversionTable, Unidades } from './ConvertionTable.js'

type TiposUnidad = keyof typeof ConversionTable

interface ConvertJson {
	cantidad: number
	to: number
	from: number
	type: TiposUnidad
}

const allrutas = (req: Request, res: Response) => {
	res.json({ message: 'hola' })
}

const getUnits = (req: Request, res: Response) => {
  res.json({Units:Unidades,tipos:Object.keys(ConversionTable)})
}

const captura = (req: Request, res: Response) => {
  console.time()
	const cuerpo: ConvertJson = req.body
	console.log(cuerpo)
  let result
	switch (cuerpo.type) {
		case 'Temperatura':
			result = convertTemperatura(cuerpo)
			break
		case 'Peso':
			result = convertPeso(cuerpo)
			break
		case 'Longitud':
			result = convertLongitud(cuerpo)
			break
	}
  console.timeEnd()
  if(result == false){
    res.json({message:false})
  }
  res.json(result)
}

const convertTemperatura = (cuerpo: ConvertJson):false|Object  => {
	const from = Unidades.Temperatura[cuerpo.from]
	const to = Unidades.Temperatura[cuerpo.to]
	if (from == undefined || to == undefined) return false

	const toCelsius = (val: number, unit: string) => {
		if (unit === 'Centigrados') return val
		if (unit === 'Kelvin') return val - 273.15
		if (unit === 'Fahrenheit') return (val - 32) * (5 / 9)
    return NaN
	}

	const fromCelsius = (c: number, unit: string) => {
		if (unit === 'Centigrados') return c
		if (unit === 'Kelvin') return c + 273.15
		if (unit === 'Fahrenheit') return c * (9 / 5) + 32
    return NaN
	}

	const celsius = toCelsius(cuerpo.cantidad, from as string)

	const result = fromCelsius(celsius, to as string)

	return { result: result }
}

const convertPeso = (cuerpo: ConvertJson):false|Object  => {
	const from = Unidades.Peso[cuerpo.from]
	const to = Unidades.Peso[cuerpo.to]
	if (from == undefined || to == undefined) return false
	const valueFrom = ConversionTable.Peso[from]
	const valueTo = ConversionTable.Peso[to]

	const cantidadGramo = cuerpo.cantidad / valueFrom
	const nuevaCantidad = cantidadGramo * valueTo
	return { result: nuevaCantidad }
}

const convertLongitud = (cuerpo: ConvertJson):false|Object => {
	const from = Unidades.Longitud[cuerpo.from]
	const to = Unidades.Longitud[cuerpo.to]
	if (from == undefined || to == undefined) return false
	const valueFrom = ConversionTable.Longitud[from]
	const valueTo = ConversionTable.Longitud[to]

	const cantidadMetro = cuerpo.cantidad / valueFrom
	const nuevaCantidad = cantidadMetro * valueTo
	return { result: nuevaCantidad }
}
export default {
	allrutas,
	captura,getUnits
}
