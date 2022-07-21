import { Api } from '../axiosConfig';

export interface IDataStock {
  id: string,
  name: string,
  quantity: number,
}

export interface IDataProduct {
  id: string,
  name: string,
  description: string,
  quantity: number,
  available: boolean,
  price: number,
}

const getAll = async (filter = ''): Promise<IDataStock[] | Error> => {
  try {
    const relativeUrl = `/products/list/stock?search=${filter}`;
    const { data } = await Api.get(relativeUrl);

    if (data) {
      return data;
    }

    return new Error('Error ao listar os registros!');
  } catch (error) {
    console.error(error);

    return new Error((error as { message: string }).message || 'Error ao listar os registros!');
  }
};

const updateById = async ( quantity: number, id: string ): Promise<IDataProduct | Error> => {
  try {

    console.log(quantity, id);

    const { data } = await Api.patch(`/products/edit/stock/${id}`, {quantity});

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

    const { data } = await Api.patch(`/products/delete/stock/${id}`);

    if ( data ) {
      return data;
    }

    return new Error('Error ao deletar o registro!');
  } catch (error) {
    console.error(error);

    return new Error((error as { message: string }).message || 'Error ao deletar o registro!');
  }
};

export const StocksService = {
  getAll,
  updateById,
  deleteById
};