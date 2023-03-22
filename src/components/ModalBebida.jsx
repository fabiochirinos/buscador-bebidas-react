import { Modal, Image, Button } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"

export default function ModalBebida() {

  const { modal, handleModalClick, receta, cargando, agregarFavorito } = useBebidas()

  const mostrarIngredientes = () => {
    let ingredientes = []

    for (let i = 1; i < 16; i++) {
      if (receta[`strIngredient${i}`]) {
        ingredientes.push(
          <li key={i}>{receta[`strIngredient${i}`]} {receta[`strMeasure${i}`]}</li>
        )
      }
    }
    return ingredientes
  }

  const handleAddFav = (e) => {
    const bebidaFavorita = {
      idDrink: receta.idDrink,
      nombre: receta.strDrink,
      img: receta.strDrinkThumb
    }
    agregarFavorito(bebidaFavorita)
    console.log(bebidaFavorita);
  }

  return (
    !cargando && (
      <Modal show={modal} onHide={handleModalClick}>
        <Image
          src={receta.strDrinkThumb}
          alt={`Imagen receta ${receta.strDrink}`}
        />
        <Modal.Header>
          <Modal.Title>{receta.strDrink}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="py-2">
            <h2>Instrucciones</h2>
            {receta.strInstructions}
            <h2>Ingredientes y cantidades</h2>
            {mostrarIngredientes()}
          </div>
        </Modal.Body>
      </Modal>
    )
  )
}
