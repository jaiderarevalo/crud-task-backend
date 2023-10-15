import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CrudService } from './crud.service';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UpdateCrudDto } from './dto/update-crud.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('/crud')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

  @Post('create')
  async createTaskUser(
    @Body() createCrudDto: CreateCrudDto,
    @Req() req: { user: User },
  ) {
    return await this.crudService.createTasks(createCrudDto, req);
  }

  @Patch(':id')
  async updateResource(@Param('id') id: string, @Body() update: UpdateCrudDto) {
    const response = await this.crudService.update(id, update);

    return response;
  }

  @Get()
  async GetAllTasks(@Req() req: { user: User }) {
    return await this.crudService.GetAll(req.user.id);
  }

  @Get(':id')
  async GetOneTask(@Param('id') id: string) {
    const response = await this.crudService.getOne(id);
    return response;
  }

  @Delete(':id')
  async deletetask(@Param('id') id: string) {
    return await this.crudService.remove(id);
  }
}
