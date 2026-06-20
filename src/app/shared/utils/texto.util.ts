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

export function sanitizarBusqueda(valor: string): string {

  return valor
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');

}