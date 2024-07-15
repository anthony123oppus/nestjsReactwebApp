import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

export class RefreshTokenJwtAuthGurad extends AuthGuard('refreshToken') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context)
    }
}