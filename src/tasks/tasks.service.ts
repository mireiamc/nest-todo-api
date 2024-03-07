import { Injectable } from '@nestjs/common';
import { TaskModel, TaskPriority } from './models/task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  _tasks: TaskModel[] = [
    {
      id: 1,
      description: 'Hacer la maleta',
      priority: TaskPriority.Alta,
      is_complete: false,
    },
    {
      id: 2,
      description: 'Confirmar el horario de los vuelos',
      priority: TaskPriority.Baja,
      is_complete: false,
    },
    {
      id: 3,
      description: 'Coger el pasaporte',
      priority: TaskPriority.Media,
      is_complete: false,
    },
  ];

  getAllTasks(): TaskModel[] {
    return this._tasks;
  }

  findTaskById(id: number): TaskModel {
    return this._tasks.find((t) => t.id === id);
  }

  createTask(input: CreateTaskDto): TaskModel {
    const newTask: TaskModel = {
      id: this._tasks.length + 1,
      description: input.description,
      priority: input.priority,
      is_complete: input.is_complete,
    };

    this._tasks.push(newTask);
    return newTask;
  }

  completeTask(id: number): TaskModel {
    const taskIndex = this._tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return null;
    }
    const completedTask = this._tasks[taskIndex];
    completedTask.is_complete = true;

    return completedTask;
  }

  getCompletedTasks(): TaskModel[] {
    return this._tasks.filter((task) => task.is_complete);
  }
}
