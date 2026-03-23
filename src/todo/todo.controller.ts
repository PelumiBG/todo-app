import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ValidationPipe, HttpStatus } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  constructor ( private readonly todoService: TodoService) {} 

  @Post('create')
  @HttpCode(201)
  async create(@Body(new ValidationPipe()) todoRepo: Todo) {
    const newTodo = await this.todoService.create(todoRepo);

    return {
      success: true,
      newTodo
    }
  }

  @Get('all')
  async findAll(@Param('userId') userId: string) {
    const todo = await this.todoService.findAll(userId);

    return {
      success: 'All task Listed',
      count: todo.length,
      todo
    }
  }

  @Patch('update')
  async update(@Param('id') id: string, todoRepo: Todo,
  @Body() updateTodoDto: UpdateTodoDto, ) {
    const todo = await this.todoService.update(id, todoRepo.userId, updateTodoDto);

    return {
      success: true,
      updatedTodo: todo
    }
  }
  
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id') id: string, todoRepo: Todo) {
      const todo = await this.todoService.remove(id, todoRepo.userId);

      return {
        success: true,
        data: todo
      }
    }
}