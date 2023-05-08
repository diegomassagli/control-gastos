import React from 'react'

// children es "palabra reservada" es lo que viene entre las etiquetas de apertura y cierre completas y puede ser multilinea

const Mensaje = ( {children, tipo} ) => {
  return (
    <div className={`alerta ${tipo}`}>
      {children}
    </div>
  )
}

export default Mensaje
