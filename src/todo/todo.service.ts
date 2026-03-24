import {
  BadGatewayException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepo: Repository<Todo>,
  ) {}

  async create(todoRepo: Todo): Promise<Todo> {
    const todo = this.todoRepo.create(todoRepo);
    try {
      return await this.todoRepo.save(todo);
    } catch (error) {
      throw new BadGatewayException('Server Error');
    }
  }

  async findAll(userId: string): Promise<Todo[]> {
    const query = this.todoRepo
      .createQueryBuilder('todo')
      .where('todo.userId = :userId', { userId })
      .orderBy('todo.createdAt', 'DESC');

    return query.getMany();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todoRepo.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    Object.assign(todo, updateTodoDto);

    return this.todoRepo.save(todo);
  }

  async delete(id: string): Promise<void> {
    const todo = await this.todoRepo.delete(id);

    if(!todo) {
      throw new NotFoundException("Todo Id Not Found")
    };

    await this.todoRepo.delete(id)
  }
}