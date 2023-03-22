import { Row } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"
import Bebida from "./Bebida"

export default function ListadoBebidas() {

  const { bebidas } = useBebidas()

  return (
    <Row className="mt-5">
      {bebidas.map(bebida => (
        <Bebida
          key={bebida.idDrink}
          bebida={bebida}
        />


      ))}
    </Row>
  )
}
