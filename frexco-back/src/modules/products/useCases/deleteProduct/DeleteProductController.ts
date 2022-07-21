import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteProductUseCase } from './DeleteProductUseCase';

class DeleteProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;

    const deleteProductUseCase = container.resolve(DeleteProductUseCase);

    const productDeleted = await deleteProductUseCase.execute({
      id,
    });

    return response.status(200).json(productDeleted);
  }
}

export { DeleteProductController };
