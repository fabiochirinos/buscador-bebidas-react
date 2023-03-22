import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const BebidasContext = createContext()

const BebidasProvider = ({ children }) => {

  const [bebidas, setBebidas] = useState([])
  const [modal, setModal] = useState(false)
  const [modalFav, setModalFav] = useState(false)
  const [bebidaId, setBebidaId] = useState(null)
  const [receta, setReceta] = useState({})
  const [cargando, setCargando] = useState(false)
  const [favorito, setFavorito] = useState([])

  useEffect(() => {

    setCargando(true)

    const obtenerReceta = async () => {
      if (!bebidaId) return

      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
        const { data } = await axios(url)
        setReceta(data.drinks[0]);

      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false)
      }
    }
    obtenerReceta()
  }, [bebidaId])

  const consultarBebida = async (datos) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`

      const { data } = await axios(url)
      setBebidas(data.drinks);

    } catch (error) {
      console.log(error);
    }
  }

  const handleModalClick = () => {
    setModal(!modal)
  }

  const handleBebidaIdClick = id => {
    setBebidaId(id)
  }

  const handleModalFavClick = () => {
    setModalFav(!modalFav)
  }

  const agregarFavorito = bebida => {
    // Comprobar si la guitarra ya esta en el favorito...
    if (favorito.some(bebidaState => bebidaState.idDrink === bebida.id)) {
      // Se asigna al array
      console.log('Ya esta en favoritos');
      //localStorage.setItem('favorito', JSON.stringify(favorito));
      return bebidaState
    } else {
      // En caso de que el articulo no exista, es nuevo y se agrega
      setFavorito([...favorito, bebida]);
      //localStorage.setItem('favorito', JSON.stringify(favorito));
    }
  }

  return (
    <BebidasContext.Provider
      value={{
        consultarBebida,
        bebidas,
        handleModalClick,
        modal,
        handleBebidaIdClick,
        receta,
        cargando,
      }}
    >
      {children}
    </BebidasContext.Provider>
  )
}

export {
  BebidasProvider
}

export default BebidasContext