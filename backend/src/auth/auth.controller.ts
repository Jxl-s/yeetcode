import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AppUser, GetUser } from './decorator/get-user.decorator';
import type { Request, Response } from 'express';
import { JwtGuard } from './guards/jwt.guard';
import { RefreshGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('protected')
  @UseGuards(JwtGuard)
  public async protected(@GetUser() user: AppUser, @Req() req: Request) {
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
    const { refreshToken } = await this.authService.handleGoogleSignIn(
      user.email,
    );

    res.cookie(this.authService.REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      expires: new Date(Date.now() + this.authService.REFRESH_TOKEN_EXPIRES * 1000),
    });

    return res.redirect('/');
  }

  @Get('token')
  @UseGuards(RefreshGuard)
  public async token(@GetUser() user: { sub: number }) {
    const accessToken = this.authService.generateAccessToken(user.sub);
    return { accessToken };
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  public async refresh(
    @GetUser() user: { sub: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const accessToken = this.authService.generateAccessToken(user.sub);
    const refreshToken = await this.authService.generateRefreshToken(
      user.sub,
      req.cookies.refresh_token,
    );

    res.cookie(this.authService.REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      expires: new Date(Date.now() + this.authService.REFRESH_TOKEN_EXPIRES * 1000),
    });

    return res.json({ accessToken });
  }
}
