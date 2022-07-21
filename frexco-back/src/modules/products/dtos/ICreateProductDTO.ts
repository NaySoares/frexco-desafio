interface ICreateProductDTO {
  name: string;
  description: string;
  quantity?: number;
  id?: string;
  price: number;
  cover?: string;
}

export { ICreateProductDTO };
