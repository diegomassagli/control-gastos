import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
    }from 'react-swipeable-list'

import 'react-swipeable-list/dist/styles.css'
// todo lo anterior viene con la libreria descargada

import { formatearFecha } from "../helpers"

import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'


// creo un diccionario de iconos para asociar categoria con imagen
const diccionarioIconos = {

  ahorro : IconoAhorro,
  comida : IconoComida,
  casa : IconoCasa,
  gastos : IconoGastos,
  ocio : IconoOcio,
  salud : IconoSalud,
  suscripciones : IconoSuscripciones

}

const Gasto = ( { gasto, setGastoEditar, eliminarGasto } ) => {

  const {categoria, nombre, cantidad, fecha, id  } = gasto

  const leadingActions = () => (                  // al cambiar llaves por parentesis, eso indica un return
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEditar(gasto)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
   <TrailingActions>
    <SwipeAction 
      onClick={() => eliminarGasto(id)}
      destructive={true}
    >
      Eliminar
    </SwipeAction>
   </TrailingActions>
  )


  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img 
              src={diccionarioIconos[categoria]}
              alt={`Icono ${categoria}`}
            />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado el{' '}<span>{formatearFecha(fecha)}</span>
              </p>          
            </div>
          </div>
          <p className="cantidad-gasto">${cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto
