import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

//This controller assumes the root route '/' for requests unless otherwise specified
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
