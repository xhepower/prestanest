import { Cliente } from 'src/clientes/entities/cliente.entity';
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
export class Prestamo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  capital: number;
  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP(6)' })
  fechaInicio: Date;
  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP(6)' })
  fechaVencimiento: Date;
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
  @ManyToOne(() => Cliente, (cliente) => cliente.prestamos)
  @JoinColumn()
  cliente: Cliente;
}
