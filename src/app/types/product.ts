export default interface Product {
  id?: string;
  name: string;
  details: string;
  brandID: string;
  purchasedPrice: number;
  salesPrice: number;
  date:Date;
  availableQuantity: number;
}
