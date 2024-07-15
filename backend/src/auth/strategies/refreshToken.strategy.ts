import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RefreshTokenJwtStrategy extends PassportStrategy(
  Strategy,
  "refreshToken",
) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refresh"),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  // ang payload kay gikan sa auth.service kung unsay gipass nimo sa this.jwtService.sign(userkey) maoy sulod sa payload
  validate(payload: any) {
    console.log(payload, "payload");
    return payload;
  }
}
