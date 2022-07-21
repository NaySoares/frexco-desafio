import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EditProductUseCase } from './EditProductUseCase';

class EditProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      price,
      cover,
    } = request.body;

    const { id } = request.params;

    const editProductUseCase = container.resolve(EditProductUseCase);

    const editedProduct = await editProductUseCase.execute({
      id,
      name,
      description,
      price,
      cover,
    });

    return response.status(200).json(editedProduct);
  }
}

export { EditProductController };
