import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/mikroorm/entities/User';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly em: EntityManager) {}

  async validateUser(chatId: string | number, pass: string): Promise<any> {
    const user = await this.em.findOne(User, { chatId: String(chatId) });
    if (user && (await user.comparePassword(pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      chat_id: user.chatId,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
