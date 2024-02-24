import { Ruta } from '../../rutas/entities/ruta.entity';
import { Prestamo } from '../../prestamos/entities/prestamo.entity';
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
@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, unique: false })
  name: string;
  @Column({ type: 'varchar', length: 255, unique: true })
  dni: string;
  @Column({ type: 'varchar', length: 255, unique: false, nullable: true })
  city: string | null;
  @Column({ type: 'varchar', length: 255, unique: false, nullable: true })
  hood: string | null;
  @Column({ type: 'varchar', length: 255, unique: false, nullable: true })
  business: string | null;
  @Column({ type: 'varchar', length: 255, unique: false, nullable: true })
  phone1: string | null;
  @Column({ type: 'varchar', length: 255, unique: false, nullable: true })
  phone2: string | null;
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
  @ManyToOne(() => Ruta, (ruta) => ruta.clientes, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  ruta: Ruta;
  @OneToMany(() => Prestamo, (prestamo) => prestamo.cliente, {
    cascade: true,
  })
  prestamos: Prestamo[];
}
