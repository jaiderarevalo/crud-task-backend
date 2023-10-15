import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CrudController } from './crud.controller';
import { CrudEntity } from './entities/crud.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([CrudEntity, Repository<CrudEntity>])],
  exports: [CrudService],
  controllers: [CrudController],
  providers: [CrudService],
})
export class CrudModule {}
