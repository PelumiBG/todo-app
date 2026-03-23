import { IsEmail, IsNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {r

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string

    @IsStrongPassword()
    password: string

    isActive: boolean
};