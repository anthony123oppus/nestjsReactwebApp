import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DevInfo } from "src/typeorm/entities/DevInfo";
import { AdminAccount } from "src/typeorm/entities/Admin";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { ConfigService } from "@nestjs/config";
import { RefreshTokenJwtStrategy } from "./strategies/refreshToken.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([DevInfo, AdminAccount]),
    // JwtModule.register({
    //   secret : 'abc123',
    //   signOptions : {expiresIn : '1h'}
    // }),
    JwtModule.registerAsync({
      useFactory : async (configService : ConfigService) => ({
          secret : configService.get<string>('JWT_SECRET'),
          signOptions : {expiresIn : '60s'}
      }),
      inject: [ConfigService],
    }),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenJwtStrategy],
})
export class AuthModule {}
