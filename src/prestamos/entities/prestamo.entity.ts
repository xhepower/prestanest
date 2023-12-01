import { Plazo } from '../../plazos/entities/plazo.entity';
import { Cliente } from '../../clientes/entities/cliente.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
export enum frecuenciaPago {
  SEMANAL = 'semanal',
  DIARIO = 'diario',
  MENSUAL = 'mensual',
  QUINCENAL = 'quincenal',
}
export enum estadoPrestamo {
  ACTIVO = 'activo',
  VENCIDO = 'vencido',
  PAGADO = 'mensual',
}
@Entity()
export class Prestamo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  capital: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  porcentaje: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  intereses: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  mora: number;
  @Column({
    type: 'enum',
    enum: frecuenciaPago,
    default: frecuenciaPago.SEMANAL,
  })
  frecuencia: frecuenciaPago;
  @Column({
    type: 'enum',
    enum: estadoPrestamo,
    default: estadoPrestamo.ACTIVO,
  })
  estado: estadoPrestamo;
  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP(6)' })
  inicio: Date;
  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP(6)' })
  vencimiento: Date;
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
  @ManyToOne(() => Plazo, (plazo) => plazo.prestamos)
  @JoinColumn()
  plazo: Plazo;
}
