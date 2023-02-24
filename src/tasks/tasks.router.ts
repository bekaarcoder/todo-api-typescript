import { Router, Request, Response } from 'express';
import { TaskController } from './tasks.controller';
import { createValidator } from './tasks.validator';
import { validationResult } from 'express-validator';

export const taskRouter: Router = Router();

taskRouter.get('/', async (req: Request, res: Response) => {
  const taskController = new TaskController();
  const allTasks = await taskController.getAll();
  res.json(allTasks).status(200);
});

taskRouter.post(
  '/',
  createValidator,
  //@ts-ignore
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
  },
);
