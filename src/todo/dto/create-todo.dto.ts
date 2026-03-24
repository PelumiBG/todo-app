import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: Date;

  @IsString()
  @IsNotEmpty()
  userId: string;

  isActive: boolean;
}
