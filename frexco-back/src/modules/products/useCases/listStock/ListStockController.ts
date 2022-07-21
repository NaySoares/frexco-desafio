import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { ListStockUseCase } from './ListStockUseCase';

type TRequestQuery = { search?: string }

class ListStockController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { search }: TRequestQuery = request.query;

    const listStockUseCase = container.resolve(ListStockUseCase);

    const stock = await listStockUseCase.execute({ search });

    return response.status(200).json(stock);
  }
}

export { ListStockController };
