import { useState, useEffect } from "react";

type UnidadesMap = Record<string, string[]>;

function App() {
  const [tipos, setTipos] = useState<string[]>([]);
  const [unidades, setUnidades] = useState<UnidadesMap>({});
  const [tipoActual, setTipoActual] = useState<string>("");
  const [from, setFrom] = useState<number>();
  const [to, setTo] = useState<number>();
  const [cantidad, setCantidad] = useState("");
  const [result, setResult] = useState<number | undefined>(undefined);
  const [oculto,setOculto]  = useState<boolean>(false);

  const [loadingConfig, setLoadingConfig] = useState(true);
  const [loadingConversion, setLoadingConversion] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("http://localhost:8700/units");
        if (!response.ok) throw new Error("No se pudo cargar la configuración");

        const data = await response.json();
        console.log(data);
        if (!data) {
          throw new Error("Formato de datos inválido");
        }

        setTipos(data.tipos);
        setUnidades(data.Units);

        const primerTipo = data.tipos[0];
        if (primerTipo) {
          setTipoActual(primerTipo);
          setFrom(0);
          setTo(1 || 0);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoadingConfig(false);
      }
    };

    fetchConfig();
  }, []);

  const changeTipo = (nuevoTipo: string) => {
    setTipoActual(nuevoTipo);
    const opciones = unidades[nuevoTipo] || [];
    if (opciones.length > 0) {
      setFrom(0);
      setTo(1 || 0);
    }
    handleReset()
    setResult(undefined);
  };

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoadingConversion(true);
    setError(null);
    setResult(undefined);

    try {
      const response = await fetch("http://localhost:8700/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: tipoActual,
          cantidad: parseFloat(cantidad),
          from,
          to,
        }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Error en la conversión");
      }

      const data = await response.json();
      setResult(data.result);
      setOculto(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de red");
    } finally {
      setLoadingConversion(false);
    }
  };

  const handleReset = () => {
    setCantidad("");
    setResult(undefined);
    setError(null);
    setOculto(false);
  };

  if (loadingConfig) {
    return (
      <main>
        <h1>Conversor de Unidades</h1>
        <p>Cargando configuración...</p>
      </main>
    );
  }

  if (error && !loadingConversion) {
    return (
      <main>
        <h1>Error</h1>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </main>
    );
  }

  if (tipos.length === 0) {
    return <main>No hay tipos de unidades disponibles.</main>;
  }

  return (
    <main>
      <h1>
        Conversor de Unidades
      </h1>

      {/* Botones de tipo */}
      <div className="unitsBlock">
        {tipos.map((tipo) => (
          <button
            className={
              tipo == tipoActual ? "unitsButton selected" : "unitsButton"
            }
            key={tipo}
            onClick={() => changeTipo(tipo)}
          >
            {tipo}
          </button>
        ))}
      </div>

      <div>
        {/* Formulario */}
        <form onSubmit={handleConvert} className={(oculto == true) ?"form oculto":"form"} >
          <label htmlFor="count">Ingrese la cantidad a convertir:</label>
          <input
            id="count"
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            step="any"
            required
            disabled={loadingConversion}
          />

          <label htmlFor="from">De:</label>
          <select
            id="from"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value as unknown as number);
            }}
            disabled={loadingConversion}
          >
            {unidades[tipoActual]?.map((u, i) => (
              <option key={i} value={i}>
                {u}
              </option>
            ))}
          </select>

          <label htmlFor="to">A:</label>
          <select
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value as unknown as number)}
            disabled={loadingConversion}
          >
            {unidades[tipoActual]?.map((u, i) => (
              <option key={i} value={i}>
                {u}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="convertButton"
            disabled={loadingConversion}
          >
            {loadingConversion ? "Convirtiendo..." : "Convertir"}
          </button>
        </form>

        {/* Resultado */}
        <article className={(oculto != true) ?"resultado oculto":"resultado"} >
          <label htmlFor="result">Resultado del Cálculo:</label>
          <input
            id="result"
            type="text" className="inputResult"
            value={result !== undefined ?  cantidad+" "+unidades[tipoActual][from as number]+ " = " + result+" "+unidades[tipoActual][to as number] : ""}
            readOnly
          />
          <button
            type="button" className="resetButton"
            onClick={handleReset}
            disabled={loadingConversion}
          >
            Resetear
          </button>
        </article>
      </div>

      {/* Mensaje de error en conversión */}
      {error && loadingConversion === false && (
        <p style={{ color: "red" }}>{error}</p>
      )}
    </main>
  );
}

export default App;
