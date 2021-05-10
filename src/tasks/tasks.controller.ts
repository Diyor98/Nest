import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.taskService.getTasksWithFilters(filterDto);
  //   }
  //   return this.taskService.getAllTasks();
  // }

  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return await this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.taskService.deleteTask(id);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(
  //   @Body() createTaskDto: CreateTaskDto
  // ): Task {
  //   return this.taskService.createTask(createTaskDto);
  // }

  // @Delete(':id')
  // deleteTask(@Param('id') id: string): string {
  //   return this.taskService.deleteTask(id);
  // }

  // @Patch(':id/status')
  // updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
  //   return this.taskService.updateTaskStatus(id, status);
  // }
}
