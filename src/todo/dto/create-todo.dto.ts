import { IsString, IsNotEmpty, IsDate } from "class-validator";

export class CreateTodoDto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsDate()
    @IsNotEmpty()
    dueDate: Date

    isActive: boolean
}