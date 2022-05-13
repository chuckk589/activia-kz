import { EntityManager, wrap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { City } from '../mikroorm/entities/City';
import { Promo } from '../mikroorm/entities/Promo';
import { User } from '../mikroorm/entities/User';
import { RetrieveUserDto } from './dto/retrieve-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<RetrieveUserDto[]> {
    const users = await this.em.find(User, {}, { populate: ['promo.translation.values', 'city.translation.values'] });
    return users.map((user) => new RetrieveUserDto(user));
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.em.nativeUpdate(
      User,
      { id },
      {
        ...(updateUserDto.city ? { city: this.em.getReference(City, Number(updateUserDto.city)) } : {}),
        ...(updateUserDto.credentials ? { credentials: updateUserDto.credentials } : {}),
        ...(updateUserDto.locale ? { locale: updateUserDto.locale } : {}),
        ...(updateUserDto.promo ? { promo: this.em.getReference(Promo, Number(updateUserDto.promo)) } : {}),
        ...(updateUserDto.phone ? { phone: updateUserDto.phone } : {}),
        ...(updateUserDto.role ? { role: updateUserDto.role } : {}),
        ...(updateUserDto.registered ? { registered: Boolean(updateUserDto.registered) } : {}),
      },
    );
  }
}
