import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly configService: ConfigService) {}

  @Get(':id')
  findOne(@Param('id', CustomParseIntPipe) id: number) {
    console.log(process.env.TEST || 'Default value not found');
    console.log(this.configService.get('TEST', 'Standard value if not found'));
    //For essential env variables, throws a server error if value is not found and no default value is provided
    console.log(this.configService.getOrThrow('TEST'));
    console.log(typeof id, id);
    return '/user controller response for user ' + id;
  }
}
