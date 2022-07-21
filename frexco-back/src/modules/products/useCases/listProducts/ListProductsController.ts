import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { ListProductsUseCase } from './ListProductsUseCase';

type TRequestQuery = { search?: string }

class ListProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { search }: TRequestQuery = request.query;

    const listProductUseCase = container.resolve(ListProductsUseCase);

    const listProducts = await listProductUseCase.execute({ search });

    return response.status(200).json(listProducts);
  }
}

export { ListProductsController };
