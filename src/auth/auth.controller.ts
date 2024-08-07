import { Controller, Get, Post, Body, Patch, Param, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  register(@Body() createAuthDto: RegisterAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
