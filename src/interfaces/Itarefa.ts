import IProjeto from "./IProjeto";

export default interface ITarefa {
  duracaoEmSegundos: number,
  descricao: String,
  projeto: IProjeto | null,
  id: number
}