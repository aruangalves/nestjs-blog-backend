import { Controller, Get, Param } from '@nestjs/common';
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe';

@Controller('user')
export class UserController {
  @Get(':id')
  findOne(@Param('id', CustomParseIntPipe) id: number) {
    console.log(typeof id, id);
    return '/user controller response for user ' + id;
  }
}
