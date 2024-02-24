import { Pago } from '../../pagos/entities/pago.entity';
import { Cliente } from '../../clientes/entities/cliente.entity';

import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
enum Estado {
  Activo = 'activo',
  Moroso = 'moroso',
  Pagado = 'pagado',
}
enum Frecuencia {
  Diario = 'diario',
  Semanal = 'semanal',
  Quincenal = 'quincenal',
  Mensual = 'mensual',
}
@Entity()
export class Prestamo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'date', nullable: false })
  inicio: Date;
  @Column({ type: 'date', nullable: false })
  vencimiento: Date;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  capital: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  porcentaje: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  porcentajemora: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  cuota: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  intereses: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  mora: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  saldo: number;
  @Column({
    type: 'varchar',
    length: 255,
    unique: false,
    default: Estado.Activo,
  })
  estado: Estado;
  @Column({
    type: 'varchar',
    length: 255,
    unique: false,
    default: Frecuencia.Diario,
  })
  frecuencia: Frecuencia;
  @Column({ type: 'date', nullable: false })
  proxima: Date;
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
  @ManyToOne(() => Cliente, (cliente) => cliente.prestamos, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  cliente: Cliente;
  @OneToMany(() => Pago, (pago) => pago.prestamo, {
    cascade: true,
  })
  pagos: Pago[];
}
