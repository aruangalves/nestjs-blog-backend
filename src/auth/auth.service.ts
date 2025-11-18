import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { HashingService } from 'src/common/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const error = new UnauthorizedException('Usuário ou senha inválidos');
    //Validate Email -> Repository || UserService <- UserModule
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw error;
    }
    //Compare password hash -> HashingService <- CommonModule
    const isPasswordValid = await this.hashingService.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw error;
    }
    // JwtService <- JwtModule
    const jwtPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(jwtPayload);

    user.forceLogout = false;
    await this.userService.save(user);

    return {
      accessToken,
    };
  }
}
