// Obtener la diferencia de anos
export function obtenerDiferenciaYear(year) {
  return new Date().getFullYear() - year;
}

// Calcula el total a pagar segun la marca
export function calcularMarca(marca) {
  let incremento;

  switch (marca) {
    case 'europeo':
      incremento = 1.30;
      break;
    case 'americano':
      incremento = 1.15;
      break;
    case 'asiatico':
      incremento = 1.05;
      break;
    default:
      break;
  }

  return incremento;
}

// Calcula el total a pagar en funcion del precio
// Cada tipo se seguro va a tener un precio != Basico 20% completo 50%

export function obtenerPlan(plan) {
  return (plan === 'basico') ? 1.20 : 1.50;
}
