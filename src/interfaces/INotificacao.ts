export enum TipoNotificacao {
  SUCESSO,
  FALHA,
  ATENCAO
}

export default interface IProjeto {
  titulo: string
  text: string
  tipo: TipoNotificacao
  id: number
}