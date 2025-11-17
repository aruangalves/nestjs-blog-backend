import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get(':id')
  findOne(@Param('id') id: string) {
    return '/user controller response for user ' + id;
  }
}
