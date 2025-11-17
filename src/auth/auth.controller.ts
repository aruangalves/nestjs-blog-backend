import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

//Route /auth
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Route /auth/login
  @Post('login')
  login() {
    return this.authService.doLogin();
  }
}
