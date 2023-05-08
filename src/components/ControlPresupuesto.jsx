import { useState, useEffect } from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ( {
  gastos, 
  setGastos, 
  presupuesto, 
  setPresupuesto, 
  setIsValidPresupuesto} ) => {

  const[porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)



  useEffect( () => {                                        // el metodo reduce "recorre el arreglo y devuelve UN SOLO resultado" similar al find
    const totalGastado = gastos.reduce( ( total, gasto ) => total + gasto.cantidad, 0 )// funcion que acumula y el cero es el valor inicial
    const totalDisponible = presupuesto - totalGastado
    setDisponible (totalDisponible)   
    setGastado(totalGastado)
    
    // calcular el porcentaje gastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
    setTimeout(() => {      
      setPorcentaje(nuevoPorcentaje)
    }, 1500);

  }, [gastos])



  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('es-AR', { 
      style: 'currency', 
      currency: 'ARS' 
    })
  }

  const handleResetApp = () => {
    const resultado = confirm('Deseas reiniciar presupuesto y gastos?')
    if(resultado) {
      setPresupuesto(0)
      setGastos([])
      setIsValidPresupuesto(false)
    } 
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
            trailColor: '#CCCCCC',
            textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
          })} 
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>
      <div className='contenido-presupuesto'>
        <button 
          className='reset-app' 
          type="button"
          onClick={handleResetApp}
        >
            Resetear App
        </button>
        <p>
          <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Gastado: </span>{formatearCantidad(gastado)}          
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span>{formatearCantidad(disponible)}
        </p>

      </div>
    </div>
  )
}

export default ControlPresupuesto
