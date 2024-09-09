import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RefreshGuard extends AuthGuard('jwt-refresh') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['refresh_token'];
    if (!token) {
      return false;
    }

    // Check if in database, and not expired
    const refreshToken = await this.prismaService.refreshToken.findUnique({
      where: {
        refresh_token: token,
      },
    });

    if (!refreshToken) {
      return false;
    }
    
    if (new Date() > refreshToken.expires_at) {
      // Delete this one
      await this.prismaService.refreshToken.delete({
        where: {
          refresh_token: token,
        },
      });

      return false;
    }

    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    if (!payload) {
      return false;
    }

    request.user = payload;
    return true;
  }
}
