import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { ListProductByIdUseCase } from './ListProductByIdUseCase';

class ListProductByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listProductByIdUseCase = container.resolve(ListProductByIdUseCase);

    const product = await listProductByIdUseCase.execute({ id });

    return response.status(200).json(product);
  }
}

export { ListProductByIdController };
