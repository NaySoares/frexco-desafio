import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EditStockUseCase } from './EditStockUseCase';

class EditStockController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      quantity,
    } = request.body;

    const { id } = request.params;

    const editStockUseCase = container.resolve(EditStockUseCase);

    const updatedProduct = await editStockUseCase.execute({
      id,
      quantity,
    });

    return response.status(200).json(updatedProduct);
  }
}

export { EditStockController };
