import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...rta } = user;
        return rta;
      }
    }
    return null;
  }
  generateJWT(user: User) {
    //console.log(process.env.JWTSECRET);
    const payload = { role: user.role, sub: user.id };
    return {
      acces_token: this.jwtService.sign(payload, {
        secret: process.env.JWTSECRET,
      }),
      user,
    };
  }
}
