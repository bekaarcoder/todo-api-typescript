import { AppDataSource } from '../..';
import { Task } from './tasks.entity';
import { instanceToPlain } from 'class-transformer';

export class TaskController {
  allTasks: Task[];
  constructor(private taskRepository = AppDataSource.getRepository(Task)) {}

  public async getAll(): Promise<Task[]> {
    try {
      this.allTasks = await this.taskRepository.find({
        order: {
          date: 'ASC',
        },
      });

      this.allTasks = instanceToPlain(this.allTasks) as Task[];
    } catch (errors) {
      console.log(errors);
    }

    return this.allTasks;
  }
}
