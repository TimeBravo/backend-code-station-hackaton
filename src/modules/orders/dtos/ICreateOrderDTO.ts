export default interface ICreateOrderDTO {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  productName: string;
  status?: boolean;
}
