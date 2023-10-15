import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import {TypeOrmModule} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { jwtConstants } from '../auth/constaints';
import {JwtModule} from '@nestjs/jwt'
@Module({
  imports:[TypeOrmModule.forFeature([User,Repository<User>]),
JwtModule.register({
  secret:jwtConstants.secret,
  signOptions:{expiresIn:'1d'}
})
],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
