import { IsNotEmpty } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
@Entity('tasks')
export class CrudEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @Column()
  task: string;
  @Column()
  description: string;
  @Column({type:'boolean'})
  status:boolean;
  @ManyToOne(() => User, (user) => user.Tasks)
  @JoinColumn({name:'user_id'})
  @IsNotEmpty()
  user:User
}
