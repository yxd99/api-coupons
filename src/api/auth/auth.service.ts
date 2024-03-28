import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as speakeasy from 'speakeasy';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateCode(login: LoginDto): Promise<object> {
    const isValidCode = speakeasy.totp.verify({
      secret: process.env.OTP_SECRET,
      encoding: 'base32',
      token: login.code,
    });
    if (!isValidCode) {
      throw new UnauthorizedException('The code expired or isnt valid');
    }

    const now = Date.now();
    const payload = {
      time: now,
    };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }
}
