import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    public REFRESH_TOKEN_COOKIE = 'refresh_token';
    public REFRESH_TOKEN_EXPIRES = 7 * 24 * 60 * 60;
    public ACCESS_TOKEN_EXPIRES = 1 * 60;

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
        const refreshToken = await this.generateRefreshToken(user.id);
        return refreshToken;
    }

    public generateAccessToken(userId: number) {
        const payload = { sub: userId };
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: this.ACCESS_TOKEN_EXPIRES,
        });
    }

    public async generateRefreshToken(
        userId: number,
        oldRefreshToken?: string,
    ) {
        const payload = { sub: userId };
        const expiresAt = new Date(
            Date.now() + this.REFRESH_TOKEN_EXPIRES * 1000,
        );

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: this.REFRESH_TOKEN_EXPIRES,
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

    public async deleteRefreshToken(refreshToken: string) {
        try {
            await this.prismaService.refreshToken.delete({
                where: { refresh_token: refreshToken },
            });

            return true;
        } catch (e) {
            throw new NotFoundException();
        }
    }
}
