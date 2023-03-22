import { useContext } from "react";
import BebidasContext from "../context/BebidasProvider";

export default function useBebidas() {
  return useContext(BebidasContext)
}