import { Controller, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/entities/todo.entity';

@Module({
  imports: [
    // Load .env globally
    ConfigModule.forRoot({ isGlobal: true }),

    // PostgreSQL connection via TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME') || 'Todo-App',
        entities: [User, Todo],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
