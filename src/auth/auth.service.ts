import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signUp(dto: AuthDto) {
    // generate hash for password生成哈希密码

    //save the new user in db

    //return the saved user
    return { msg: 'signUp' };
  }
  signIn() {
    return 'signIn';
  }
}
