import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: AuthDto) {
    // generate hash for password生成哈希密码
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash
        }
      });
      //save the new user in db
      delete user.hash;
      //return the saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
  async signIn(dto: AuthDto) {
    //find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });
    //if user does not exits throw error throw exception
    if (!user) throw new ForbiddenException('Credentials invalid');
    //compare the password with the hash
    const pwMatche = await argon.verify(user.hash, dto.password);
    // if password is wrong throw error throw exception
    if (!pwMatche) throw new ForbiddenException('password invalid');

    //send back the user
    delete user.hash;
    return user;
  }
}
