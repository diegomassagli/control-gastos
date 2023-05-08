import { useState, useRef } from 'react'
import Mensaje from './Mensaje'


const NuevoPresupuesto = ( { presupuesto, setPresupuesto, setIsValidPresupuesto } ) => {

  const [mensaje, setMensaje] = useState('')

  const inputRef = useRef(null);

  const handlePresupuesto = e => {
    e.preventDefault();
    if (!presupuesto || presupuesto < 0) {
      setMensaje("No es un presupuesto valido")
      return
    } 

    // si es un presupuesto valido
    setMensaje('')
    setIsValidPresupuesto(true)
  }

  const handleFocus = () => {
    inputRef.current.select();
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className='campo'>
          <label>Definir Presupuesto</label>
          <input 
            ref={inputRef}
            onFocus={handleFocus}
            className='nuevo-presupuesto'
            type="number"                                 // si el type lo dejo como text, da error al convertir a number, pero si y a lo filtro como number esta ok
            placeholder='Añade tu Presupuesto'
            value={presupuesto}            
            onChange={ e => setPresupuesto(Number(e.target.value))}
          />
        </div>
        <input type="submit" value="Añadir" />

        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}  
      </form>
    </div>
  )
}

export default NuevoPresupuesto


/* cuando el componente esta definido el prop con children va con apertura y cierre de este tipo multilinea*/