import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { compareSync } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const salt = await bcrypt.genSalt(10);
      const res = this.userRepository.save({
        email: createUserDto.email.toLowerCase(),
        name: createUserDto.name,
        password: await bcrypt.hash(createUserDto.password, salt),
      });
      if (!res) {
        throw new HttpException(
          'No se pudo crear el usuario',
          HttpStatus.BAD_REQUEST,
        );
      }
      return res;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      this.userRepository.merge(user, updateUserDto);
      const res = this.userRepository.save(user);
      if (!res) {
        throw new HttpException(
          'no se pudo actualizar',
          HttpStatus.BAD_REQUEST,
        );
      }
      return res;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const res = await this.userRepository.delete(id);
      if (!res) {
        throw new HttpException(
          'no se pudo eliminar usuario',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async checkPassword(users: User, password: string): Promise<boolean> {
    try {
      const res = compareSync(password, users.password);
      if (!res) {
        throw new HttpException(
          'email o password invalido',
          HttpStatus.BAD_REQUEST,
        );
      }
      return res;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        return null;
      }
      const isPasswordValid = await this.checkPassword(user, password);
      if (!isPasswordValid) {
        return null;
      }
      return user;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
