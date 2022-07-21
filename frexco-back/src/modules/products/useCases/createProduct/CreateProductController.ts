import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      price,
      cover,
    } = request.body;

    const createProductUseCase = container.resolve(CreateProductUseCase);

    const product = await createProductUseCase.execute({
      description,
      name,
      price,
      cover,
    });

    return response.status(201).json(product);
  }
}

export { CreateProductController };
