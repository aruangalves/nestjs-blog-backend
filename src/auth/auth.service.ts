import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  doLogin() {
    return '/auth/login AuthService response';
  }
}
