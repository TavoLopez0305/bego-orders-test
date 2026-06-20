export function cortarTexto(
  texto: string | undefined,
  limite: number = 30
): string {

  if (!texto) {
    return '';
  }

  return texto.length > limite
    ? texto.slice(0, limite) + '...'
    : texto;
}