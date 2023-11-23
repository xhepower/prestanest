import { User } from '../../users/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
@Entity()
export class Ruta {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
  @ManyToOne(() => User, (user) => user.rutas)
  @JoinColumn()
  user: User;
}
