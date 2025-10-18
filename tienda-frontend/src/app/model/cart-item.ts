export interface CartItem {
  id: number;
  producto: {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
  };
  cantidad: number;
  subtotal: number;
}
