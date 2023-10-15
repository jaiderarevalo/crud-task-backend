import {
  BadRequestException,
  Body,
  Controller,
  Post,
  HttpCode,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserResponse } from 'src/user/user.response';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async create(@Body() createuserdto: CreateUserDto) {
    const { email } = createuserdto;
    const alreadyEmail = await this.userService.findOneByEmail(email);
    if (alreadyEmail) {
      throw new BadRequestException({
        statusCode: 400,
        message: {
          email: ['Email already exists'],
        },
      });
    }

    if (createuserdto.password !== createuserdto.confirmPassword) {
      throw new BadRequestException({
        statusCode: 400,
        message: {
          passwordConfirmation: ['password confirmation does not match'],
        },
      });
    }
    const user = await this.userService.create(createuserdto);

    const { password, ...result } = user;

    return result as UserResponse;
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginCoach: LoginUserDto) {
    const user = await this.userService.validateUser(
      loginCoach.email,
      loginCoach.password,
    );
    console.log(user);

    if (!user) {
      throw new BadRequestException({
        statusCode: 400,
        message: {
          auth_error: 'validate failed',
        },
      });
    }

    const payload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const { password, createdAt, updatedAt, deletedAt, ...rest } = user;
    return { accessToken, user: rest };
  }

  @Post('validate-token')
  async validateToken(@Body() body: { token: string }) {
    try {
      const { sub } = this.jwtService.verify(body.token);
      const user = await this.userService.findOne(sub);
      if (!user) {
        throw new BadRequestException({
          message: {
            auth_error: 'token no valido',
          },
        });
      }
      const { password, createdAt, updatedAt, deletedAt, ...rest } = user;

      return { user: rest, accessToken: body.token };
    } catch (error) {
      throw new BadRequestException({
        message: {
          auth_error: 'token no valido',
        },
      });
    }
  }
}
