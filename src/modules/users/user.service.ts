import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  user: any;

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne1(condition: any): Promise<User> {
    return this.usersRepository.findOne(condition);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }
  async read(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // findOneUser(id: number): Promise<User | null> {
  //   return this.usersRepository.findOneBy(id);
  // }

  async removeUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async create(data: any): Promise<User> {
    return this.usersRepository.save(data);
  }
}
