import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockUser = { id: 12, username: 'Test user' };

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn()
});

describe('TasksService', () => {
    let tasksService;
    let taskRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TaskRepository, useFactory: mockTaskRepository}
            ]
        }).compile();

        tasksService = await module.get<TasksService>(TasksService);
        taskRepository = await module.get<TaskRepository>(TaskRepository);
    });


    describe('getTasks', () => {
        it('gets all tasks from the repository.', async () => {
            taskRepository.getTasks.mockResolvedValue('somevalue');
            expect(taskRepository.getTasks).not.toHaveBeenCalled();

            const filters: GetTasksFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'Some search query'};
            // call taskService.getTasks
            const result = await tasksService.getTasks(filters, mockUser);
            expect(taskRepository.getTasks).toHaveBeenCalled();
            // expecte taskRepository.getTasks toHaveBeenCalled
            expect(result).toEqual('somevalue');
        })
    });

    describe('getTaskById', () =>  {
        it('call repository.findOne() and successfully retrieve and return the task', async () => {
            const mockTask = { title: 'Test task', description: 'Test desc'}
            taskRepository.findOne.mockResolvedValue(mockTask);

            const result = await tasksService.getTaskById(1, mockUser);
            expect(result).toEqual(mockTask);

            expect(taskRepository.findOne).toHaveBeenCalledWith({where : { id:1, userId: mockUser.id }});
        })

        it('throws an error as task not found', () => {
            taskRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(NotFoundException);
        })
    })


})