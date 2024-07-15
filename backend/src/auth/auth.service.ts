import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminAccount } from 'src/typeorm/entities/Admin';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(AdminAccount) private adminRepository : Repository<AdminAccount>,
        private jwtService : JwtService
    ){}

   async validateUser({username, password} : LoginDto) {
        const user = await this.adminRepository.findOne({ where: { username }, relations : ['devInfo'] });

        if (user && await bcrypt.compare(password, user.password)) {
            const {password , ...userkey} = user
            return {
              accessToken :  this.jwtService.sign(userkey),
              refreshToken : this.jwtService.sign(userkey,{expiresIn : '1d'})
            }
        }
        return null
    }

    async refreshToken(token: string) {
        try {
            const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            const { username } = decoded;
            const user = await this.adminRepository.findOne({ where: { username }, relations : ['devInfo'] });
            // console.log(user)
            if (!user) {
                throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
            }
            const {password, ...payload} = user // Adjust payload as needed
            return {
                accessToken: this.jwtService.sign(payload),
                refreshToken : this.jwtService.sign(payload,{expiresIn : '1d'})
            };
        } catch (e) {
            throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
        }
    }
}
