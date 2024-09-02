export default interface Order {
  id: string;
  orderNo: string;
  productID: string;
  quantity: number;
  salePrice: number;
  discount:number;
  totalAmount:number;
}
