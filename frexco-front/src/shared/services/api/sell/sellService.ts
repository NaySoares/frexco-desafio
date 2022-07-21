import { Api } from '../axiosConfig';

export interface IDataProduct {
  id: string,
  name: string,
  description: string,
  quantity: number,
  available: boolean,
  price: number,
}

const getById = async (quantity = 1, id: string): Promise<IDataProduct | Error> => {
  try {
    const relativeUrl = `/products/buy/${id}`;
    const { data } = await Api.patch(relativeUrl, {quantity}) ;

    if (data) {
      return data;
    }

    return new Error('Error efetuar a compra, tente novamente!');
  } catch (error) {
    console.error(error);

    return new Error((error as { message: string }).message || 'Error ao efetuar a compra!');
  }
};

export const SellService = {
  getById,
};