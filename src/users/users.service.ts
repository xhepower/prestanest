import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindOptionsWhere } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FilterUsersDto } from './dto/filter-users.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepo.create(createUserDto);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    return this.userRepo.save(newUser);
  }

  findAll(params?: FilterUsersDto) {
    const { limit, offset, minDate, maxDate } = params;
    const where: FindOptionsWhere<User> = {};
    if (minDate && maxDate) {
      where.created_at = Between(minDate, maxDate);
    }

    return this.userRepo.find({
      relations: ['rutas.clientes'],
      where,
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: [{ id }],
      relations: ['rutas.clientes'],
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepo.merge(user, updateUserDto);
    return this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
