import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AppUser, GetUser } from './decorator/get-user.decorator';
import type { Response } from 'express';
import { JwtGuard } from './guards/jwt.guard';
import { RefreshGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('protected')
  @UseGuards(JwtGuard)
  public async protected(@GetUser() user: AppUser) {
    return `you are logged in as user #${user.userId}`;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  public async googleSignIn() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  public async googleSignInCallback(
    @GetUser() user: { email: string },
    @Res() res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.handleGoogleSignIn(user.email);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/',
    });

    return res.json({ accessToken });
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  public async refresh(@GetUser() user: { sub: number }, @Res() res: Response) {
    const accessToken = this.authService.generateAccessToken(user.sub);
    const refreshToken = this.authService.generateRefreshToken(user.sub);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/',
    });

    return res.json({ accessToken });
  }
}
