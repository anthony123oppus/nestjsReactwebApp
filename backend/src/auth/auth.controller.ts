import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenJwtAuthGurad } from './guards/refreshtoken.jwt.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService : AuthService) {}

    // @Post('login')
    // // example when not using a local auth guard
    // // @UseGuards(AuthGuard('local'))
    // @UseGuards(LocalGuard)
    // login(@Body() loginData : LoginDto) {
    //     return this.authService.validateUser(loginData)
    // }

    // proper way
    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req : Request) {
        return req.user
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req : Request) {
       return req.user
    }

    // refresh way
    @Post('refresh')
    @UseGuards(RefreshTokenJwtAuthGurad)
    async refresh(@Body('refresh') refresh: string) {
        return this.authService.refreshToken(refresh);
    }
}
