import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Prestamo } from '../../prestamos/entities/prestamo.entity';
@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  monto: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  saldoAnterior: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  saldoActual: number;
  @Column({ type: 'date', nullable: false })
  fecha: Date;
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
  @ManyToOne(() => Prestamo, (prestamo) => prestamo.pagos, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  prestamo: Prestamo;
}
