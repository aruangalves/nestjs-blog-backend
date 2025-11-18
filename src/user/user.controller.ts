import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  @Get(':id')
  findOne(@Param('id', CustomParseIntPipe) id: number) {
    console.log(process.env.TEST || 'Default value not found');
    console.log(this.configService.get('TEST', 'Standard value if not found'));
    //For essential env variables, throws a server error if value is not found and no default value is provided
    console.log(this.configService.getOrThrow('TEST'));
    console.log(typeof id, id);
    return '/user controller response for user ' + id;
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
