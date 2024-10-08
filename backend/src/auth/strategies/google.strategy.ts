import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email'],
    });
  }

  public async validate(
    _a: string,
    _r: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { emails } = profile;

    const user = {
      email: emails[0].value,
    };

    done(null, user);
  }
}
