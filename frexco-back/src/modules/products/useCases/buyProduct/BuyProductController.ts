import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BuyProductUseCase } from './BuyProductUseCase';

class BuyProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      quantity,
    } = request.body;

    const { id } = request.params;

    const buyProductUseCase = container.resolve(BuyProductUseCase);

    const updatedProduct = await buyProductUseCase.execute({
      id,
      quantity,
    });

    return response.status(200).json(updatedProduct);
  }
}

export { BuyProductController };
