import { Router } from 'express';
import { taskController } from './tasks.controller';
import { createValidator, updateValidator } from './tasks.validator';

export const taskRouter: Router = Router();

taskRouter.get('/', taskController.getAll);

taskRouter.post('/', createValidator, taskController.create);

taskRouter.put('/', updateValidator, taskController.update);
