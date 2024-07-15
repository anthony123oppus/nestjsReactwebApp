import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
//  export class JwtStrategy extends PassportStrategy(Strategy,'alufan') - ang alufan ang pangalan sa sa stategy maong sa
//  jwt.guard nimo dapat alufan sa and imong isulod ex export class JwtAuthGuard extends AuthGuard('alufan')
// and default niya kay 'jwt' export class JwtStrategy extends PassportStrategy(Strategy) pwede dili nimo butangan or name and imong strategy unya ang ibutang sa jwtAuthGuard kay in ani export class JwtAuthGuard extends AuthGuard('jwt')
export class JwtStrategy extends PassportStrategy(Strategy, "alufan") {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // must be the same in authModule jwtModule.register secret
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  // ang payload kay gikan sa auth.service kung unsay gipass nimo sa this.jwtService.sign(userkey) maoy sulod sa payload
  validate(payload: any) {
    // console.log(payload, "payload");
    return payload;
  }
}
