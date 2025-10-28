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

const captura = (req: Request, res: Response) => {
	const cuerpo: ConvertJson = req.body()
	console.log(cuerpo)
	switch (cuerpo.type) {
		case 'Temperatura':
			convertTemperatura(cuerpo)
			break
		case 'Peso':
			convertPeso(cuerpo)
			break
		case 'Longitud':
			convertLongitud(cuerpo)
			break
	}
}

const convertTemperatura = (cuerpo: ConvertJson) => {}

const convertPeso = (cuerpo: ConvertJson) => {
	const from = Unidades.Peso[cuerpo.from]
	const to = Unidades.Peso[cuerpo.to]
	if (from == undefined || to == undefined) return false
	const valueFrom = ConversionTable.Peso[from]
	const valueTo = ConversionTable.Peso[to]

	const cantidadGramo = cuerpo.cantidad / valueFrom
	const nuevaCantidad = Math.round(cantidadGramo * valueTo)
	return { result: nuevaCantidad }
}

const convertLongitud = (cuerpo: ConvertJson) => {
	const from = Unidades.Longitud[cuerpo.from]
	const to = Unidades.Longitud[cuerpo.to]
	if (from == undefined || to == undefined) return false
	const valueFrom = ConversionTable.Longitud[from]
	const valueTo = ConversionTable.Longitud[to]

	const cantidadMetro = cuerpo.cantidad / valueFrom
	const nuevaCantidad = Math.round(cantidadMetro * valueTo)
  console.log(to," ",from," ",nuevaCantidad)
	return { result: nuevaCantidad }
}

export default {
	allrutas,
	captura,
}
