export const { format: formatPrice } = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });