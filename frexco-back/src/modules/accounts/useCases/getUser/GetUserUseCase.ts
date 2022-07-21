import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IResponse {
  user: {
    name: string;
    email: string;
    isAdmin: boolean;
  }
  token: string;
}

interface IRequest {
  id: string
}

@injectable()
class GetUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}
  async execute({ id }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('User not found');
    }

    const token = sign({}, 'd2626f412da748e711ca4f4ae9428664', {
      subject: user.id,
      expiresIn: '1d',
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    };

    return tokenReturn;
  }
}

export { GetUserUseCase };
