import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteStockUseCase } from './DeleteStockUseCase';

class DeleteStockController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;

    const deleteStockUseCase = container.resolve(DeleteStockUseCase);

    const productDeleted = await deleteStockUseCase.execute({
      id,
    });

    return response.status(200).json(productDeleted);
  }
}

export { DeleteStockController };
