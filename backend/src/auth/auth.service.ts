import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  public async handleGoogleSignIn(email: string) {
    // Check if email exists
    let user = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
      },
    });

    // Try creating a new user if it doesn't exist
    if (!user) {
      try {
        user = await this.prismaService.user.create({
          data: { email },
        });
      } catch (e) {
        throw new InternalServerErrorException();
      }
    }

    // Generate tokens
    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(user.id);
    return { accessToken, refreshToken };
  }

  public generateAccessToken(userId: number) {
    const payload = { sub: userId };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
  }

  public async generateRefreshToken(userId: number, oldRefreshToken?: string) {
    const payload = { sub: userId };
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    try {
      if (oldRefreshToken) {
        await this.prismaService.refreshToken.update({
          where: { refresh_token: oldRefreshToken, user_id: userId },
          data: {
            refresh_token: refreshToken,
            expires_at: expiresAt,
          },
        });

        return refreshToken;
      }

      // Is a new token
      await this.prismaService.refreshToken.create({
        data: {
          user_id: userId,
          refresh_token: refreshToken,
          expires_at: expiresAt,
        },
      });

      return refreshToken;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  public async validateRefreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return payload;
    } catch (e) {
      return null;
    }
  }
}
