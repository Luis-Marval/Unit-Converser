import { useState } from "react";
import Unidades from "./unit";
type unidad = "Temperatura" | "Peso" | "Longitud";
function App() {
  const [result, setResult] = useState<number | undefined>(undefined);
  const [unit, setUnit] = useState<unidad>("Temperatura");
  const unitList = ["Temperatura", "Peso", "Longitud"];
  function changeUnit(e: any) {
    setUnit(e.target.innerText);
  }
  return (
    <>
      <main>
        <h1>Conversor de Unidades</h1>
        <div>
          {unitList.map((value, index) => {
            return (
              <button key={index} onClick={changeUnit}>
                {value}
              </button>
            );
          })}
        </div>
        <form>
          <label htmlFor="">
            Ingrese la cantidad a convertir
            <input type="number" name="" id="" />
          </label>
          <br />
          <label htmlFor="from">unidad desde la que convertir</label>{" "}
          <select name="" id="from">
            {Unidades[unit].map((value, index) => {
              return (
                <option value={value} key={index}>
                  {value}
                </option>
              );
            })}
          </select>
          <br />
          <label htmlFor="to">unidad a convertir</label>{" "}
          <select name="" id="to">
            {Unidades[unit].map((value, index) => {
              return (
                <option value={value} key={index}>
                  {value}
                </option>
              );
            })}
          </select>
          <br />
          <button>Convertir</button>
        </form>
        <article>
          <label htmlFor="">Resultado del Calculo</label>
          <input type="text" value={result} />
          <button>Resetear</button>
        </article>
      </main>
    </>
  );
}

export default App;
