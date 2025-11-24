import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

//Route /auth
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Route /auth/login
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
