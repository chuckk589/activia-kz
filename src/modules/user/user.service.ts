import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { User } from '../mikroorm/entities/User';
import { RetrieveUserDto } from './dto/retrieve-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {
    //TODO: clean
    // this.em
    //   .find(User, {}, { populate: ['promo.translation.values', 'city.translation.values'] })
    //   .then((users) => console.log(users.map((user) => new RetrieveUserDto(user))));
  }

  async findAll(): Promise<RetrieveUserDto[]> {
    const users = await this.em.find(User, {}, { populate: ['promo.translation.values', 'city.translation.values'] });
    return users.map((user) => new RetrieveUserDto(user));
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
