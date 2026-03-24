import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ValidationPipe,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  @HttpCode(201)
  async create(@Body(new ValidationPipe()) todoRepo: Todo) {
    const newTodo = await this.todoService.create(todoRepo);

    return {
      success: true,
      newTodo,
    };
  }

  @Get('all')
  async findAll(@Query('userId') userId: string) {
    const todo = await this.todoService.findAll(userId);

    return {
      success: 'All task Listed',
      count: todo.length,
      todo,
    };
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoService.update(id, updateTodoDto);

    return {
      success: true,
      updatedTodo: todo,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const del = await this.todoService.delete(id);

    return {
      success: true,
      message:"Todo deleted",
      data: del
    }
  }
}
