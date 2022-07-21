import { Router } from 'express';

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { GetUserController } from '@modules/accounts/useCases/getUser/GetUserController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const getUserController = new GetUserController();

usersRoutes.get('/me', ensureAuthenticated, getUserController.handle);
usersRoutes.post('/', createUserController.handle);

export { usersRoutes };
