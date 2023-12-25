import { CreateTaskDto } from './dto/create-task-dto';
import { FilterSearchQuery } from './dto/filter-search-query';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get()
    getTasks(@Query(ValidationPipe) filterSearchQuery : FilterSearchQuery) : Task[]{
        return this.taskService.getTasks(filterSearchQuery);
    }


    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto : CreateTaskDto):Task{
        return this.taskService.createTasks(createTaskDto);
    }
 
    @Get('/:id')
    getTaskById(@Param('id') id:string): Task {
         return this.taskService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string): void {
         return this.taskService.deleteTask(id);
    }
    

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id:string, 
        @Body('status', TaskStatusValidationPipe) status : TaskStatus
        ): Task {
         return this.taskService.updateTaskStatus(id, status);
    }
    
} 
