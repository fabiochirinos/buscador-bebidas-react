import { useContext } from "react";
import CategoriasContext from "../context/CategoriasProvider";

export default function useCategorias() {
  return useContext(CategoriasContext)
}