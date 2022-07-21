import { Environment } from '../../../environment';
import { Api } from '../axiosConfig';

export interface IDataProduct {
  id: string,
  name: string,
  description: string,
  cover?: string
  quantity: number,
  available: boolean,
  price: number,
}

type TListProducts = {
  data:  IDataProduct[],
  totalCount: number
}

const getAll = async (filter = ''): Promise<TListProducts | Error> => {
  try {
    const relativeUrl = `/products?search=${filter}`;
    const { data, headers } = await Api.get(relativeUrl);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMIT_LINE) ,
      };
    }

    return new Error('Error ao listar os registros!');
  } catch (error) {
    console.error(error);

    return new Error((error as { message: string }).message || 'Error ao listar os registros!');
  }
};

const getById = async (id: string): Promise<IDataProduct | Error> => {
  try {
    const { data } = await Api.get(`/products/${id}`);

    if ( data ) {
      return data;
    }

    return new Error('Error ao consultar o registro!');
  } catch (error) {
    console.error(error);

    return new Error((error as { message: string }).message || 'Error ao consultar o registro!');
  }
};

const create = async (name: string, price: number, description: string, cover?: string): Promise<IDataProduct | Error> => {
  try {
    const dataProduct = { name, price, description, cover };

    const { data } = await Api.post('/products', dataProduct);

    if ( data ) {
      return data;
    }

    return new Error('Error ao cadastrar o produto!');
  } catch (error) {
    console.error(error);

    return new Error((error as { message: string }).message || 'Error ao cadastrar o produto!');
  }
};

const updateById = async (dataProduct: Partial<IDataProduct>, id: string): Promise<IDataProduct | Error> => {
  try {

    const { data } = await Api.patch(`/products/edit/${id}`, dataProduct);

    if ( data ) {
      return data;
    }

    return new Error('Error ao editar o registro!');
  } catch (error) {
    console.error(error);

    return new Error((error as { message: string }).message || 'Error ao editar o registro!');
  }
};

const deleteById = async (id: string): Promise<IDataProduct | Error> => {
  try {

    const { data } = await Api.delete(`/products/${id}`);

    if ( data ) {
      return data;
    }

    return new Error('Error ao deletar o registro!');
  } catch (error) {
    console.error(error);

    return new Error((error as { message: string }).message || 'Error ao deletar o registro!');
  }
};

export const ProductsService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};