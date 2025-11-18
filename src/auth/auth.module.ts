import { InternalServerErrorException, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { CommonModule } from 'src/common/common.module';
import { JwtModule } from '@nestjs/jwt';
import { StringValue } from 'ms';

@Module({
  imports: [
    UserModule,
    CommonModule,
    JwtModule.registerAsync({
      useFactory: (secret: string, expiration: StringValue) => {
        secret = process.env.JWT_SECRET || '';
        expiration = (process.env.JWT_EXPIRATION as StringValue) || '1d';
        if (!secret) {
          throw new InternalServerErrorException('JWT_SECRET not ser in .env');
        }
        return {
          secret: secret,
          signOptions: { expiresIn: expiration },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
