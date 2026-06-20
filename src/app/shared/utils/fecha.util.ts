export function formatearFecha(
  timestamp: number | undefined
): string {

  if (!timestamp) {
    return '--/--/--';
  }

  return new Date(timestamp)
    .toLocaleDateString('es-MX');
}

export function formatearHora(
  timestamp: number | undefined
): string {

  if (!timestamp) {
    return '--:--';
  }

  return new Date(timestamp)
    .toLocaleTimeString(
      'es-MX',
      {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }
    );
}