import { ConversionTable, Unidades } from './ConvertionTable.js';
const allrutas = (req, res) => {
    res.json({ message: 'hola' });
};
const captura = (req, res) => {
    const cuerpo = req.body();
    console.log(cuerpo);
    switch (cuerpo.type) {
        case "Temperatura":
            convertTemperatura(cuerpo);
            break;
        case "Peso":
            convertTemperatura(cuerpo);
            break;
        case "Longitud":
            convertTemperatura(cuerpo);
            break;
    }
};
const convertTemperatura = (cuerpo) => {
    const from = Unidades.Peso[cuerpo.from];
    const to = Unidades.Peso[cuerpo.to];
    if (from == undefined || to == undefined)
        return false;
    const valueFrom = ConversionTable.Peso[from];
    const valueTo = ConversionTable.Peso[to];
    const cantidadCelsius = cuerpo.cantidad / valueFrom;
    const nuevaCantidad = Math.round(cantidadCelsius * valueTo);
    console.log(from, "\n", to, "\n", valueFrom, "\n", valueTo, "\n", cantidadCelsius, "\n", nuevaCantidad, "\n");
    process.exit(0);
};
const convertPeso = (cuerpo) => {
};
const convertLongitud = (cuerpo) => {
};
convertTemperatura({
    cantidad: 5,
    to: 1,
    from: 0,
    type: "Temperatura"
});
export default {
    allrutas, captura
};
