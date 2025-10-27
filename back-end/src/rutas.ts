import type { Response, Request, NextFunction } from 'express'
import { ConversionTable,Unidades } from './ConvertionTable.js';


type TiposUnidad = keyof typeof ConversionTable;

interface ConvertJson {
  cantidad:number,
  to:number
  from:number,
  type:TiposUnidad
}

const allrutas = (req: Request, res: Response) => {
	res.json({ message: 'hola' })
}


const captura = (req: Request, res: Response) => {
  const cuerpo:ConvertJson = req.body()
  console.log(cuerpo)
  switch(cuerpo.type){
    case "Temperatura":
      convertTemperatura(cuerpo)
    break;
    case "Peso":
      convertTemperatura(cuerpo)
    break;
    case "Longitud":
      convertTemperatura(cuerpo)
    break;
  }
}


const convertTemperatura = (cuerpo: ConvertJson) => {
  const from = Unidades.Peso[cuerpo.from]
  const to = Unidades.Peso[cuerpo.to]
  if(from == undefined || to == undefined) return false
  const valueFrom = ConversionTable.Peso[from]
  const valueTo = ConversionTable.Peso[to]

  const cantidadCelsius = cuerpo.cantidad / valueFrom
  const nuevaCantidad = Math.round(cantidadCelsius * valueTo)
  console.log(
    from,"\n",
    to,"\n",
    valueFrom,"\n",
    valueTo,"\n",
    cantidadCelsius,"\n",
    nuevaCantidad,"\n",
  ) 
}

const convertPeso = (cuerpo: ConvertJson) => {
  
}
const convertLongitud = (cuerpo: ConvertJson) => {

}

export default {
	allrutas,captura
}
