import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCrudDto } from './dto/create-crud.dto';
import { CrudEntity } from './entities/crud.entity';
import { UpdateCrudDto } from './dto/update-crud.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CrudService {
  constructor(
    @InjectRepository(CrudEntity)
    private readonly taskRepository: Repository<CrudEntity>,
  ) {}
  async createTasks(createCrudDto: CreateCrudDto, req: { user: User }) {
    try {
      const task = this.taskRepository.create({
        task: createCrudDto.task,
        description: createCrudDto.description,
        status: createCrudDto.status,
        user: req.user,
      });
      const create = await this.taskRepository.save(task);
      console.log('datos guardados', create);

      if (!create) {
        throw new HttpException('no se pudo guardar', HttpStatus.BAD_REQUEST);
      }
      return create;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async update(id: string, updateTask: UpdateCrudDto) {
    console.log(updateTask);
    try {
      await this.taskRepository.update(id, {
        ...updateTask,
      });

      return this.taskRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      await this.taskRepository.delete(id);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async GetAll(id: string): Promise<CrudEntity[]> {
    try {
      const response = await this.taskRepository.find({
        where: { user: { id: id } },
        relations: ['user'],
      });
      if (!response)
        throw new HttpException(
          'no se pudo obtener las tareas',
          HttpStatus.BAD_REQUEST,
        );
      return response;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async getOne(id: string) {
    try {
      const response = await this.taskRepository.findOne({ where: { id } });
      if (!response) {
        throw new HttpException(
          'no se pudo obtener la tarea',
          HttpStatus.BAD_REQUEST,
        );
      }
      return response;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
