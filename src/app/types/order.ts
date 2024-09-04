export default interface Order {
  id?: string;
  orderNo: string;
  productID: string;
  quantity: number|null;
  salePrice: number|null;
  discount:number|null;
  totalAmount:number|null;
}
