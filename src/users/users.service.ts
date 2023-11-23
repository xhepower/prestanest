import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindOptionsWhere } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FilterUsersDto } from './dto/filter-users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepo.create(createUserDto);
    return this.userRepo.save(newUser);
  }

  findAll(params?: FilterUsersDto) {
    const { limit, offset, minDate, maxDate } = params;
    const where: FindOptionsWhere<User> = {};
    if (minDate && maxDate) {
      where.created_at = Between(minDate, maxDate);
    }
    return this.userRepo.find({
      relations: ['rutas'],
      where,
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: [{ id }],
      relations: ['rutas'],
    });
    if (!user) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return user;
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
