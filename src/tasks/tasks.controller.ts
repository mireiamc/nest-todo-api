import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskModel } from './models/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({
    description: 'Listado de tareas devuelto con éxito.',
    type: [TaskModel],
  })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado.' })
  getTasks(): TaskModel[] {
    return this.tasksService.getAllTasks();
  }

  @UseGuards(AuthGuard)
  @Get('history')
  @ApiOkResponse({
    description: 'Histórico de tareas devuelto con éxito.',
    type: [TaskModel],
  })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado.' })
  getCompletedTasks(): TaskModel[] {
    return this.tasksService.getCompletedTasks();
  }

  @UseGuards(AuthGuard)
  @Get(':taskId')
  @ApiOkResponse({
    description: 'Tarea encontrada con éxito.',
    type: TaskModel,
  })
  @ApiNotFoundResponse({ description: 'Tarea no encontrada.' })
  @ApiBadRequestResponse({ description: 'Fallo en la validación de entrada.' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado.' })
  getTaskById(@Param('taskId', ParseIntPipe) id: number): TaskModel {
    const task = this.tasksService.findTaskById(id);

    if (!task) {
      throw new NotFoundException(`La tarea con Id ${id} no se encuentra`);
    }

    return task;
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOkResponse({ description: 'Tarea creada con éxito.', type: TaskModel })
  @ApiBadRequestResponse({ description: 'Fallo en la validación de entrada.' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado.' })
  createTask(@Body() newTask: CreateTaskDto): TaskModel {
    return this.tasksService.createTask(newTask);
  }

  @UseGuards(AuthGuard)
  @Post(':taskId/complete')
  @ApiOkResponse({
    description: 'Tarea actualizada con éxito.',
    type: TaskModel,
  })
  @ApiNotFoundResponse({ description: 'Tarea no encontrada.' })
  @ApiBadRequestResponse({ description: 'Fallo en la validación de entrada.' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado.' })
  completeTask(@Param('taskId', ParseIntPipe) id: number): TaskModel {
    const completedTask = this.tasksService.completeTask(id);
    if (!completedTask) {
      throw new NotFoundException(`La tarea con Id ${id} no se encuentra`);
    }
    return completedTask;
  }
}
