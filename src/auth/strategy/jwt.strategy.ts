import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    // config 不是用private 是因为 super()会先调用 ，我并不会在后续调用config所以private是没意义的
    // 策略
    super({
      // 固定写法，从请求头header中获取Authorization字段的值 Bearer xxx 中的xxxx
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //忽略过期时间？否
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  //请求的jwt解析后得到的值会在这里
  //   然后再注入到controller中的  req.user
  async validate(payload: { sub: number; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    delete user.hash;
    return user;
  }
}
