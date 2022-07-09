import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo : Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hash(createUserDto.password);
    return this.userRepo.save(createUserDto);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOne({where: {id : id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.id = id
    if(updateUserDto.password){
      updateUserDto.password = await this.hash(updateUserDto.password);
    }
    return this.userRepo.save(updateUserDto);
  }

  async remove(id: number) {
    let user = await this.userRepo.findOne({where: {id : id}})
    return this.userRepo.remove(user);
  }

  hash(plainPassword){
    const hash = bcrypt.hash(plainPassword, 10);
    return hash;
  }

  compare(plainPassword, hash){
    const valid = bcrypt.compareSync(plainPassword,hash);
    return valid;
  }
}
