import { useState, useEffect } from 'react'

// funciones propias y componentes
import Header from './components/Header'
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';

// css
import IconoNuevoGasto from './img/nuevo-gasto.svg'



function App() {

// mantiene el listado de gastos  
const [gastos, setGastos] = useState(
  localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
)

// mantiene el valor del presupuesto
const [presupuesto, setPresupuesto] = useState(
  Number(localStorage.getItem('presupuesto')) ?? 0                  // en lugar de setearlo en cero, lo seteo con el valor del presupuesto ya ingresado
);

// indica si ya tengo un presupuesto valido ingresado
const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

// indica si tiene que mostrarse la ventana modal o no para editar gastos
const [modal, setModal] = useState(false)
// indica si hay que agregar la clase de animacion al form del modal
const [animarModal, setAnimarModal] = useState(false)

// para las ediciones
const [gastoEditar, setGastoEditar] = useState({})

// para los filtros
const [filtro, setFiltro] = useState('')  // si tuviera la posibilidad de filtrar varios items usaria un arreglo
const [gastosFiltrados, setGastosFiltrados] = useState([])


useEffect( () => {
  if(Object.keys(gastoEditar).length > 0) {

    setModal(true)    
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
    
  }
},[gastoEditar])




// con esto seteo EL PRESUPUESTO en el localStorage
useEffect( () => {
  localStorage.setItem('presupuesto', presupuesto ?? 0)  
}, [presupuesto] )

// con esto hago que si ya tengo un presupuesto, no lo vuelva a pedir si recargo app
useEffect( () => {
  const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
  if(presupuestoLS > 0) {
    setIsValidPresupuesto(true)  // con esto verifico si al cargar recupere un valor valido del localStorage asi no vuelvo a pedir lo mismo al cohete.
  }
},[]);


// con esto seteo LOS GASTOS en el localStorage, PERO RECUERDO QUE NO PUEDO ALMACENAR ARREGLOS SINO SOLO STRINGS
useEffect( () => {
  localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
}, [gastos] );


// useEffect para filtro
useEffect( () => {
  if(filtro){
    // filtrar gastos por categoria
    const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
    setGastosFiltrados(gastosFiltrados)
  }
}, [filtro])







// ANIMACION MODAL
// funcion que llame a la ventana modal con animacion
const handleNuevoGasto = () => {
  setModal(true)
  setGastoEditar({})  // para que arranque el alta con un form vacio

  setTimeout(() => {
    setAnimarModal(true)
  }, 500);

}


// GUARDAR
  const guardarGasto = gasto => {
    if(gasto.id) {
      // Actualizar, creo un nuevo arreglo con la misma info recorrida      
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})              // para limpiar objeto de gasto en edicion
    } else {     
      // nuevo gasto 
          gasto.id = generarId()            // aca puedo agregar lo que quiera, no hace falta que previamente defina ese campo
          gasto.fecha = Date.now()
          setGastos([...gastos, gasto])
    }
    // despues de grabar hay que cerrar el formulario para que no quede sucia la pantalla
    
    setAnimarModal(false)
    
    setTimeout(() => {
      setModal(false)
    }, 500);  
  }


  // ELIMINAR
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

                  // pasaba que la ventana modal no cubria toda la pantalla, entonces, ahora cuando este en modal le agrega la clase "fijar"
  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />


      {isValidPresupuesto  && (        
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto} 
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}      

      {modal && 
        <Modal 
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      }  

    </div>
  )
}

export default App
