import { Body, Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignInDto, SignOutDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/signin')
  async signIn(@Body() dto: SignInDto) {}

  @Get('/signout')
  async signOut(@Body() dto: SignOutDto) {}
}
