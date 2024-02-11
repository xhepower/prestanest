function obtenerFechaHoraLocal() {
  // Obtener la fecha y hora actual en la zona horaria local (America/Tegucigalpa)
  let fechaHoraLocal = new Date().toLocaleString('en-US', {
    timeZone: 'America/Tegucigalpa',
  });
  return fechaHoraLocal;
}

// Ejemplo de uso
console.log(obtenerFechaHoraLocal());
console.log(new Date('2/8/2024, 10:05:10 PM'));
