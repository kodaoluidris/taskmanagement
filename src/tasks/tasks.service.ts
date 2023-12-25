import { CreateTaskDto } from './dto/create-task-dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid} from 'uuid';
import { FilterSearchQuery } from './dto/filter-search-query';


@Injectable()
export class TasksService {

    private tasks : Task[] = [];

    getTasks (filterSearchQuery:FilterSearchQuery = null) : Task[] {
        let tasks = this.tasks;
        if(Object.keys(filterSearchQuery).length){
             const { search, status } = filterSearchQuery;
             if(status){
                 tasks = this.tasks.filter(task => status === task.status);
             }

             if(search){
                tasks = this.tasks.filter(task => 
                    task.title.includes(search) || task.description.includes(search)
                 );
             }
        }
        return tasks;
    }

    getTaskById(id:string) : Task {
        const found = this.tasks.find(task => task.id === id);
        if(!found){
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return found;
    }


    deleteTask(id:string) : void {
        const task = this.getTaskById(id) 
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
    

    updateTaskStatus(id:string, status : TaskStatus) : Task {
        const task = this.getTaskById(id) 
        task.status = status;
        return task;
    }

    createTasks(createTaskDto : CreateTaskDto) : Task {
        const  { title, description } =  createTaskDto;
        const task : Task = {
            id : uuid(),
            title, 
            description,
            status:TaskStatus.OPEN
        }

        this.tasks.push(task);
        return task;
    }
}
